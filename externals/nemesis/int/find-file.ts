import {nemesis} from '@ishvara/operator-fasm';

// в bx кладем имя файла(ascii)
export async function findFile() {
    // Считываем сектор, в котором находятся записи об
    // именах файлах и данных о них и ищем название
    di = bx;
    push(di);
    push(bx);
    do {
        push(cx);
        al = nemesis.readSector({
            count: 1,
            buffer: 0x7c00,
            sector: 2,
            track: 0,
            head: 1,
        });
        
        if (!al)
            break;
        
        pop(cx);
    } while(--cx);
    
    if (al) {
        pop(di);
        pop(cx);
        al = 0;
        
        return;
    }
    
    si = 0x7c00;
    do {
    } while(true);
}
/*
;---------------------------------------------
    find_file_in_fat1:
mov	si,0x7c00
find_file_in_fat:
    pop	di
push	di
push	 si
_strcmp:
    lodsb
cmp	[di],al
jnz	 _strcmp_end
inc	di
jmp	 _strcmp
_strcmp_end:
    ;ненашли если
pop	si

cmp	 al,0x20
jnz	 not_equal
xor	 al,al
not_equal:
    
    or	al,al
jz	find_all_good
add	si,0x20
lodsb
or	al,al
jz	file_not_found
dec	si
jmp	find_file_in_fat

find_all_good:
    add	si,$1a
lodsw
mov	[file_offset],ax
lodsw
mov	[file_size],ax
mov	bx,0x200
cwd
div	bx
or	dl,dl
jz     _dl0
inc    al
_dl0:	mov    [file_sec_size],al
pop    di
pop    cx
xor    al,al

iret;нашли =)!!!
    file_not_found:
pop	di
pop	cx

mov	al,1;Ничо не нашли o_O ...
iret
*/

