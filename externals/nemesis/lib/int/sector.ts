import {io, nemesis} from '@ishvara/operator-fasm';

let status_buffer: rb = 7;
let sec_quantity = 0;
let secbuffer: i16 = 0;
let sec_number = 0;
let track_number = 0;
let drive = 0;
let head = 0;
let secread_com = 0xE6;
let dma_command = 0x46;

let MSG_READ_SECTOR = [
    'read sector: enter',
    0xd,
];
let MSG_READ_SECTOR_EXIT = [
    'read sector: exit: sector > 0x12',
    0xd,
];
let MSG_READ_SECTOR_HEAD_EXIT = [
    'read sector: head > 1',
    0xd,
];

let REG = 0;

DMA_COMMAND_READ.equ = 0x4a;
DMA_COMMAND_WRITE.equ = 0x46;

RESET_CONTROLLER.equ = 4;
USE_DMA.equ = 8;
RUN_MOTOR.equ = 16;

FLOPPY.equ = 0;
// ah - кол-во секторов
// bx - buffer
// cl - номер сектора
// ch - номер дорожки
// dl - номер накопителя(0 для дискеты первой)
// dh - головка
export async function readSector() {
    [sec_quantity] = ah;
    [secbuffer] = bx;
    [sec_number] = cl;
    [track_number] = ch;
    [drive] = dl;
    [head] = dh;
    
    if (cl > 0x12) {
        nemesis.printf(MSG_READ_SECTOR_EXIT);
        return 1;
    }
    
    if (dh > 1) {
        nemesis.printf(MSG_READ_SECTOR_HEAD_EXIT);
        return 2;
    }
    
    nemesis.printf(MSG_READ_SECTOR);
    
    do {
        [--sec_quantity];
        sti();
        dx = 0x3f2;
        al = RESET_CONTROLLER + USE_DMA + RUN_MOTOR;
        io.out(dx, al);
        await waitLong();
        ah = 15; // номер кода
        await out_fdc(); // посылаем контроллеру НГМД
        ah = FLOPPY; //номер накопителя (дискета ;))
        await out_fdc();
        ah = [track_number];
        await out_fdc();
        await wait_interrupt(); //ожидаем прерывания от нгдм
        await waitShort();
        al = [dma_command];
        //0x4a;для записи 0x46
        // код чтения данных контроллера нмгд
        io.out(12, al); // посылаем код по 2-ум адресам
        io.out(11, al); // вычисляем адрес буфера
        ax = [secbuffer]; // смещение буфера в ds
        bx = ds;
        cl = 4; //готовим вращения старшего нибла
        rol(bx, cl); //вращаем младшие 4 бита
        dl = bl;
        dl &= 0xf; //чистим старший нибл в dl
        bl &= 0xf0; //чистим младший нибл в bl
        ax &= bx;
        jnc(no_carry);
        // если небыло переноса
        // то страници в dl
        ++dl; // увеличиваем dl, если был перенос
        no_carry: io.out(4, al);
        // посылаем младший байт адреса
        al = ah; // сдвигаем старший байт
        io.out(4, al); //посылаем младший байт адреса
        al = dl; //засылаем номер страницы
        io.out(0x81, al);
        //посылаем номер страницы
        // конец инициализации
        ax = 0x200 - 1; //значение счетчика
        io.out(5, al); //посылаем младший байт
        al = ah; // готовим старший байт
        io.out(5, al); //посылаем старший байт
        al = 2; //готовим разрешение канала 2
        io.out(10, al); //DMA ожидает данные
        ah = [secread_com]; // 0xE6;0x66;код чтения одного сектора
        await out_fdc();
        //посылаем команду контроллеру нмгд
        ah = [head];
        // head/drive по форумуле
        // 00000hdd, поэтому если головка 1
        // ;то в ah будет 4=2^2
        ah <<= 2;
        await out_fdc();
        
        ah = [track_number];
        await out_fdc();
        
        ah = [head];
        await out_fdc();
        ah = [sec_number];
        await out_fdc();
        
        ah = 2; // 0x200 [es:bx+3];код размера сектора
        await out_fdc();
        
        ah = 0x12; //[es:bx+4];номер конца дорожки
        await out_fdc();
        
        ah = 0x1B; // [es:bx+5];длина сдвига
        await out_fdc();
        ah = 0xFF;
        //[es:bx+6];длина данных
        // не используется потому, что
        // размер сектора задан!
        await out_fdc();
        await wait_interrupt();
        // читаем результирующие байты
        cx = 7; // берем 7 байтов статуса
        bx = status_buffer;
        do {
            await in_fdc(); //получаем байт
            [bx] = al; // помещаем в буфер
            ++bx; // указываем на следующий байт буфера
        } while (--cx);
        // выключаем мотор
        dx = 0x3f2;
        al = RESET_CONTROLLER + USE_DMA; // оставляем биты 3 и 4 (12)
        io.out(dx, al); // посылаем новую установку
        [secbuffer] += 0x200;
        [--sec_number];
        
        if ([sec_number] > 0x12) {
            [--track_number];
            [sec_number] = 1;
        } else {
            al = 0;
        }
        
        al |= [sec_quantity];
    } while (al);
}

// ждем прерывание нгмд; управление статусом
async function wait_interrupt<es>() {
    // прерывания 6 в байте статуса BIOS
    ax = 0x40; // Сегмент области данных BIOS
    es = ax; //помещаем в es
    bx = 0x3e; //смещение для байта статуса
    do {
        dl = es[bx];
    } while (dl === 0x80);
    // проверяем бит 7
    dl &= 0b1_111_111; //сбрасываем бит 7
    es[bx] = dl; //заменяем байт стутуса
}

async function waitLong() {
    cx = 3500;
    loop($);
}

async function waitShort() {
    cx = 1750;
    loop($);
}

// шлем байт из ah fdc
async function out_fdc() {
    dx = 0x3f4;
    // адрес порта регистра статуса
    do {
        io.in(al, dx); //и данные
    } while (al === 128);
    ++dx;
    al = ah;
    io.out(dx, al);
}

async function in_fdc() {
    dx = 0x3f4;
    do {
        io.in(al, dx);
    } while (al === 128);
    ++dx;
    io.in(al, dx);
}
