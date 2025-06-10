org 0x7e00
use16
_reboot equ 0
_get_char equ 1
_printf equ 2
_find_file equ 3
_exec equ 4
_find_first equ 5
_color equ 6
_setcursor equ 7
_gets equ 8
_cls equ 9
_getcursor equ 0xa
_setminmaxcolline equ 0xb
_secread equ 0xc
_secwrite equ 0xd
_enter equ 0xd
_backspace equ 0xe

__ishvara_kernel:
cli
push ax
push es
xor ax, ax
mov es, ax
mov ax, __ishvara_int_table
mov [es:0xff * 4], ax
mov [es:0xff * 4 + 2], cs
pop es
pop ax
sti
mov al, _printf
mov bx, hi
int 0xff
hi db 'hello from Nemizida =)!!!', 0xd, 0

__ishvara_int_table:
test al, al
jnz __ishvara_fasm_if_1
jmp far 0xFFFF:0x0000

__ishvara_fasm_if_1:
cmp al, _printf
jnz __ishvara_fasm_if_2
jmp __ishvara_printf

__ishvara_fasm_if_2:
iret

__ishvara_scroll:
pusha
mov ax, 0xb800
mov ds, ax
mov es, ax
mov si, 0x50 * 2
xor di, di
mov cx, 0x50 * 0x18 * 2
rep movsb
xor ax, ax
mov ds, ax
mov ah, [bgcolor]
shl ah, 4
add ah, [textcolor]
mov cx, 0x50
rep stosw
popa
ret

__ishvara_printf:
push es
push bx
push cx
push di
mov ax, 0xb800
mov es, ax
push bx
call __ishvara_getStringLength
mov cx, ax
mov si, bx
mov al, _setcursor
mov bl, [col]
mov bh, [line]
int 0xff

__ishvara_print:
lodsb
test al, al
jz __ishvara_fasm_if_3
cmp al, _enter
jnz __ishvara_fasm_if_4
inc [line]
mov [col], 0
cmp [line], 0x19
jl __ishvara__nopoint2write
call __ishvara_scroll
dec [line]
jmp __ishvara__nopoint2write

__ishvara_fasm_if_4:
cmp al, _backspace
jnz __ishvara_fasm_if_5
xor al, al
mov ah, [mincol]
cmp ah, [col]
jnz __ishvara_fasm_if_6
jmp __ishvara__nopoint2write

__ishvara_fasm_if_6:
dec [col]
dec [col]
sub di, 2

__ishvara_fasm_if_5:
mov ah, [bgcolor]
shl ah, 4
add ah, [textcolor]
stosw
inc [col]

__ishvara__nopoint2write:
mov al, _setcursor
mov bl, [col]
mov bh, [line]
int 0xff
loop __ishvara_print

__ishvara_fasm_if_3:
pop di
pop cx
pop bx
pop es
iret

__ishvara_getStringLength:
pop ax
pop si
push ax
mov cx, -1
cld

__ishvara_do_while_136:
lodsb
inc cx
test al, al
jnz __ishvara_do_while_136
mov ax, cx
ret
line db 3
minline db 0
maxline db 0x18
col db 0
mincol db 0
maxcol db 0x4f
textcolor db 2
bgcolor db 0
file_offset dw 0
file_size dw 0
file_sec_size db 0
error_reading db 'error reading the file o_O', 0
exec_addr dw $500
old_ds dw 0
old_es dw 0
