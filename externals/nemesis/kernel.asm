org 0x7e00
use16
_secwrite equ 0xd
_secread equ 0xc
_setminmaxcolline equ 0xb
_getcursor equ 0xa
_cls equ 9
_gets equ 8
_setcursor equ 7
_color equ 6
_find_first equ 5
_exec equ 4
_find_file equ 3
_printf equ 2
_get_char equ 1
_reboot equ 0
FLOPPY equ 0
RUN_MOTOR equ 0x10
USE_DMA equ 8
RESET_CONTROLLER equ 4
DMA_COMMAND_WRITE equ 0x46
DMA_COMMAND_READ equ 0x4a
_backspace equ 0xe
_enter equ 0xd
cli
push ax
push es
xor ax, ax
mov es, ax
mov ax, __ishvara_intTable
mov [es:0xff * 4], ax
mov [es:0xff * 4 + 2], cs
pop es
pop ax
sti
mov al, 2
mov bx, hi
int 0xff
mov al, 4
mov bx, sh3ll
int 0xff
jmp $

__ishvara_intTable:
test al, al
jnz __ishvara_fasm_if_1
jmp far 0xFFFF:0x0000

__ishvara_fasm_if_1:
cmp al, _printf
jnz __ishvara_fasm_if_2
call __ishvara_printf
iret

__ishvara_fasm_if_2:
cmp al, _setcursor
jnz __ishvara_fasm_if_3
call __ishvara_setCursor
iret

__ishvara_fasm_if_3:
cmp al, _cls
jnz __ishvara_fasm_if_4
call __ishvara_clearScreen
iret

__ishvara_fasm_if_4:
cmp al, _setminmaxcolline
jnz __ishvara_fasm_if_5
call __ishvara_minMaxColLine
iret

__ishvara_fasm_if_5:
cmp al, _getcursor
jnz __ishvara_fasm_if_6
call __ishvara_getCursor
iret

__ishvara_fasm_if_6:
cmp al, _secread
jnz __ishvara_fasm_if_7
call __ishvara_readSector
iret

__ishvara_fasm_if_7:
iret

__ishvara_wait_interrupt:
push es
mov ax, 0x40
mov es, ax
mov bx, 0x3e

__ishvara_do_while_307:
mov dl, [es:bx]
test dl, 0x80
jnz __ishvara_do_while_307
and dl, 0x7f
mov [es:bx], dl
pop es
ret

__ishvara_readSector:
cmp cl, 0x12
jle __ishvara_fasm_if_8
mov ax, 1
ret

__ishvara_fasm_if_8:
cmp dh, 1
jle __ishvara_fasm_if_9
mov ax, 2
ret

__ishvara_fasm_if_9:
__ishvara_secread_all_good:
mov [sec_quantity], ah
mov [secbuffer], bx
mov [sec_number], cl
mov [track_number], ch
mov [drive], dl
mov [head], dh

__ishvara_secreading:
dec [sec_quantity]
sti
mov dx, 0x3f2
mov al, RESET_CONTROLLER + USE_DMA + RUN_MOTOR
out dx, al
call __ishvara_wait
mov ah, 0xf
call __ishvara_out_fdc
mov ah, FLOPPY
call __ishvara_out_fdc
mov ah, [track_number]
call __ishvara_out_fdc
call __ishvara_wait_interrupt
ret

__ishvara_in_fdc:
mov dx, 0x3f4

__ishvara_do_while_456:
in al, dx
test al, 0x80
jnz __ishvara_do_while_456
inc dx
in al, dx
ret

__ishvara_out_fdc:
mov dx, 0x3f4

__ishvara_do_while_472:
in al, dx
test al, 0x80
jnz __ishvara_do_while_472
inc dx
mov al, ah
out dx, al
ret

__ishvara_wait:
mov cx, 0xdac
loop $
ret

__ishvara_clearScreen:
push es
push ax
push di
mov ax, 0xb800
mov es, ax
mov ah, al
call __ishvara_getColor
xchg ah, al
mov al, 0
xor di, di
mov cx, 0x19 * 0x50
rep stosw
xor bx, bx
call __ishvara_setLine
call __ishvara_setColumn
pop di
pop ax
pop es
ret

__ishvara_setCursor:
push es
push dx
mov ax, 0xb800
mov es, ax
call __ishvara_setColumn
call __ishvara_setLine
mov al, bl
mov ah, 0
mov bh, 0
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
mov dl, al
call __ishvara_getLine
xchg dl, al
imul dx, 0x50 * 2
mov di, dx
call __ishvara_getColumn
imul ax, 2
add di, ax
pop dx
pop es
mov ax, di
ret

__ishvara_getCursor:
call __ishvara_getColumn
mov ah, al
call __ishvara_getLine
xchg ah, al
ret

__ishvara_printf:
push es
push bx
push cx
push di
mov ax, 0xb800
mov es, ax
mov cx, ax
push bx
call __ishvara_getStringLength
xchg cx, ax
mov si, bx
mov bl, al

__ishvara_do_while_559:
call __ishvara_getColumn
xchg bl, al
mov bh, al
call __ishvara_getLine
xchg bh, al
mov al, 7
int 0xff
mov di, ax
lodsb
cmp al, _enter
jnz __ishvara_fasm_if_10
call __ishvara_incLine
mov bl, 0
call __ishvara_setColumn
call __ishvara_getLine
cmp al, 0x19
jnz __ishvara_fasm_if_11
call __ishvara_scroll
call __ishvara_decLine

__ishvara_fasm_if_11:
jmp __ishvara_do_while_condition_559

__ishvara_fasm_if_10:
cmp al, _backspace
jnz __ishvara_fasm_if_12
mov ah, al
call __ishvara_getColumn
xchg ah, al
call __ishvara_getMinColumn
cmp ah, al
jz __ishvara_fasm_if_13
call __ishvara_decColumn
call __ishvara_decColumn
sub di, 2

__ishvara_fasm_if_13:
jmp __ishvara_do_while_condition_559

__ishvara_fasm_if_12:
mov bl, al
mov ah, al
call __ishvara_getColor
xchg ah, al
mov al, bl
stosw
call __ishvara_incColumn

__ishvara_do_while_condition_559:
loop __ishvara_do_while_559
pop di
pop cx
pop bx
pop es
ret

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
mov ah, al
call __ishvara_getColor
xchg al, ah
mov cx, 0x50
rep stosw
popa
ret

__ishvara_getColor:
mov al, [backgroundColor]
shl al, 4
add al, [textColor]
ret

__ishvara_setTextColor:
mov [textColor], al
ret

__ishvara_getTextColor:
mov al, [textColor]
ret

__ishvara_getBackgroundColor:
mov al, [backgroundColor]
ret

__ishvara_setBackgroundColor:
mov [backgroundColor], al
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

__ishvara_minMaxColLine:
mov [minCol], bl
mov [maxCol], cl
mov [minLine], bh
mov [maxLine], ch
ret

__ishvara_getMinColumn:
mov al, [minCol]
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

__ishvara_do_while_713:
lodsb
inc cx
test al, al
jnz __ishvara_do_while_713
mov ax, cx
ret
old_esi dw 0
old_ds dw 0
exec_addr dw 0x500
error_reading2 db 'error reading the file o_O', 0
file_sec_size db 0
file_size dw 0
file_offset dw 0
not_f db 'sh3ll not found :(!', 0
buf rb 0x10
sh3ll db 'SH3LL ', 0
hi db 'Hello from Nemesis =)!', 0xd, 0
dma_command db 0x46
secread_com db 0xE6
head db 0
drive db 0
track_number db 0
sec_number db 0
secbuffer dw 0
sec_quantity db 0
stutus_buffer rb 7
backgroundColor db 0
textColor db 2
col db 0
maxCol db 0x4f
minCol db 0
maxLine db 0x18
minLine db 0
line db 3

