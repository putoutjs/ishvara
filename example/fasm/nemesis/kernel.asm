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
_backspace equ 0xe
_enter equ 0xd

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
mov al, 2
mov bx, hi
int 0xff
jmp $
hi db 'Hello from Nemesis =)!', 0xd, 0

__ishvara_int_table:
test al, al
jnz __ishvara_fasm_if_1
jmp far 0xFFFF:0x0000

__ishvara_fasm_if_1:
cmp al, _printf
jnz __ishvara_fasm_if_2
jmp __ishvara_printf

__ishvara_fasm_if_2:
cmp al, _setcursor
jnz __ishvara_fasm_if_3
jmp __ishvara_setCursor

__ishvara_fasm_if_3:
iret

__ishvara_setCursor:
push es
push dx
mov ax, 0xb800
mov es, ax
call __ishvara_setColumn
call __ishvara_setLine
mov al, bl
xor ah, ah
xor bh, bh
mov dx, 0x50
mul dx
add bx, ax
mov al, 0xf
mov dx, 0x03d4
out dx, al
mov al, bl
mov dx, 0x03d5
out dx, al
mov al, 0xe
mov dx, 0x03d4
out dx, al
mov al, bh
mov dx, 0x03d5
out dx, al
xor dx, dx
xor ax, ax
call __ishvara_getLine
mov dl, al
imul dx, 0x50 * 2
mov di, dx
call __ishvara_getColumn
imul ax, 2
add di, ax
pop dx
pop es
mov ax, di
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

__ishvara_do_while_136:
call __ishvara_getColumn
mov bl, al
call __ishvara_getLine
mov bh, al
mov al, 7
int 0xff
mov di, ax
lodsb
cmp al, _enter
jnz __ishvara_fasm_if_4
call __ishvara_incLine
xor bl, bl
call __ishvara_setColumn
call __ishvara_getLine
cmp al, 0x19
jnz __ishvara_fasm_if_5
call __ishvara_scroll
call __ishvara_decLine

__ishvara_fasm_if_5:
jmp __ishvara_do_while_condition_136

__ishvara_fasm_if_4:
cmp al, _backspace
jnz __ishvara_fasm_if_6
call __ishvara_getColumn
mov ah, al
call __ishvara_getMinColumn
cmp ah, al
jz __ishvara_fasm_if_7
call __ishvara_decColumn
call __ishvara_decColumn
sub di, 2

__ishvara_fasm_if_7:
jmp __ishvara_do_while_condition_136

__ishvara_fasm_if_6:
mov ah, [bgcolor]
shl ah, 4
add ah, [textcolor]
stosw
call __ishvara_incColumn

__ishvara_do_while_condition_136:
loop __ishvara_do_while_136
pop di
pop cx
pop bx
pop es
iret

__ishvara_getMinColumn:
mov al, [mincol]
ret

__ishvara_setColumn:
mov [col], bl
ret

__ishvara_decColumn:
dec [col]
ret

__ishvara_incColumn:
inc [col]
ret

__ishvara_getColumn:
mov al, [col]
ret

__ishvara_setLine:
mov [line], bh
ret

__ishvara_decLine:
dec [line]
ret

__ishvara_incLine:
inc [line]
ret

__ishvara_getLine:
mov al, [line]
ret

__ishvara_getStringLength:
pop ax
pop si
push ax
mov cx, -1
cld

__ishvara_do_while_229:
lodsb
inc cx
test al, al
jnz __ishvara_do_while_229
mov ax, cx
ret
minline db 0
maxline db 0x18
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
line db 3
col db 0
mincol db 0

