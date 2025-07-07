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
mov bx, shell
int 0xff
jmp $

__ishvara_intTable:
test al, al
jnz __ishvara_fasm_if_end_1
jmp far 0xFFFF:0x0000

__ishvara_fasm_if_end_1:
cmp al, _find_file
jnz __ishvara_fasm_if_end_2
call __ishvara_findFile
iret

__ishvara_fasm_if_end_2:
cmp al, _printf
jnz __ishvara_fasm_if_end_3
call __ishvara_printf
iret

__ishvara_fasm_if_end_3:
cmp al, _setcursor
jnz __ishvara_fasm_if_end_4
call __ishvara_setCursor
iret

__ishvara_fasm_if_end_4:
cmp al, _exec
jnz __ishvara_fasm_if_end_5
call __ishvara_exec
iret

__ishvara_fasm_if_end_5:
cmp al, _cls
jnz __ishvara_fasm_if_end_6
call __ishvara_clearScreen
iret

__ishvara_fasm_if_end_6:
cmp al, _setminmaxcolline
jnz __ishvara_fasm_if_end_7
call __ishvara_minMaxColLine
iret

__ishvara_fasm_if_end_7:
cmp al, _getcursor
jnz __ishvara_fasm_if_end_8
call __ishvara_getCursor
iret

__ishvara_fasm_if_end_8:
cmp al, _secread
jnz __ishvara_fasm_if_end_9
call __ishvara_readSector
iret

__ishvara_fasm_if_end_9:
iret

__ishvara_exec:
mov al, 2
mov bx, EXECUTING
int 0xff
mov al, 3
int 0xff
test ax, ax
jz __ishvara_fasm_if_end_10
mov al, 2
mov bx, NOT_FOUND
int 0xff
ret

__ishvara_fasm_if_end_10:
mov al, 2
mov bx, FOUND
int 0xff
mov cx, 3

__ishvara_do_while_124:
push cx
call __ishvara_getFileOffset
sub al, 2
mov cx, 0x200
mul cx
add ax, 0x4200
cwd
div cx
mov cx, 0x12
cwd
div cx
inc dl
mov cl, dl
mov dx, ax
push dx
mov bx, 2
cwd
div bx
mov ch, al
mul bx
pop dx
cmp dx, 1
jnz __ishvara_fasm_if_else_15
mov dh, 1
jmp __ishvara_fasm_if_end_15

__ishvara_fasm_if_else_15:
mov dh, 0
mov ah, al

__ishvara_fasm_if_end_15:
call __ishvara_getFileSecSize
xchg ah, al
mov bx, [exec_addr]
mov dl, 0
mov al, 0xc
int 0xff
jnc __ishvara_read_sector_ok_155
mov al, 1
jmp __ishvara_read_sector_end_155

__ishvara_read_sector_ok_155:
xor ax, ax

__ishvara_read_sector_end_155:
clc
test al, al
jnz __ishvara_fasm_if_end_16
jmp __ishvara_ishvara_do_while_break_124

__ishvara_fasm_if_end_16:
pop cx
loop __ishvara_do_while_124

__ishvara_ishvara_do_while_break_124:
test al, al
jz __ishvara_fasm_if_end_11
mov al, 2
mov bx, NOT_FOUND
int 0xff
mov ax, 1
ret

__ishvara_fasm_if_end_11:
call [exec_addr]
xor ax, ax
ret

__ishvara_findFile:
mov cx, 3
mov di, bx
push di
push bx

__ishvara_do_while_185:
push cx
mov al, 2
mov bx, MSG_FIND_FILE_READ_SECTOR
int 0xff
mov ah, 1
mov bx, 0x7c00
mov cx, 2
mov dl, 0
mov dh, 1
mov al, 0xc
int 0xff
jnc __ishvara_read_sector_ok_188
mov al, 1
jmp __ishvara_read_sector_end_188

__ishvara_read_sector_ok_188:
xor ax, ax

__ishvara_read_sector_end_188:
clc
test al, al
jnz __ishvara_fasm_if_end_17
mov al, 2
mov bx, MSG_EMPTY_READ_RESULT
int 0xff
jmp __ishvara_ishvara_do_while_break_185

__ishvara_fasm_if_end_17:
mov al, 2
mov bx, MSG_NOT_EMPTY_READ_RESULT
int 0xff
pop cx
loop __ishvara_do_while_185

__ishvara_ishvara_do_while_break_185:
test al, al
jz __ishvara_fasm_if_end_12
pop di
pop cx
mov al, 0
ret

__ishvara_fasm_if_end_12:
mov si, 0x7c00

__ishvara_find_file_in_fat:
pop di
push di
push si

__ishvara__strcmp:
lodsb
cmp [di], al
jnz __ishvara__strcmp_end
inc di
jmp __ishvara__strcmp

__ishvara__strcmp_end:
pop si
cmp al, 0x20
jnz __ishvara_not_equal
mov al, 0

__ishvara_not_equal:
or al, al
jz __ishvara_find_all_good
add si, 0x20
lodsb
or al, al
jz __ishvara_file_not_found
dec si
jmp __ishvara_find_file_in_fat

__ishvara_find_all_good:
add si, 0x1a
lodsw
call __ishvara_setFileOffset
lodsw
mov [file_size], ax
mov bx, 0x200
cwd
div bx
or dl, dl
jz __ishvara__dl0
inc al

__ishvara__dl0:
call __ishvara_setFileSecSize
pop di
pop cx
mov al, 0
ret

__ishvara_file_not_found:
pop di
pop cx
mov al, 1
ret

__ishvara_setFileOffset:
mov [file_offset], ax
ret

__ishvara_getFileOffset:
mov ax, [file_offset]
ret

__ishvara_setFileSecSize:
mov [file_sec_size], al
ret

__ishvara_getFileSecSize:
mov al, [file_sec_size]
ret

__ishvara_in_fdc:
mov dx, 0x3f4

__ishvara_do_while_278:
in al, dx
test al, 0x80
jnz __ishvara_do_while_278
inc dx
in al, dx
ret

__ishvara_out_fdc:
mov dx, 0x3f4

__ishvara_do_while_289:
in al, dx
test al, 0x80
jnz __ishvara_do_while_289
inc dx
mov al, ah
out dx, al
ret

__ishvara_waitShort:
mov cx, 0x6d6
loop $
ret

__ishvara_waitLong:
mov cx, 0xdac
loop $
ret

__ishvara_wait_interrupt:
push es
mov ax, 0x40
mov es, ax
mov bx, 0x3e

__ishvara_do_while_314:
mov dl, [es:bx]
test dl, 0x80
jnz __ishvara_do_while_314
and dl, 0x7f
mov [es:bx], dl
pop es
ret

__ishvara_readSector:
mov [sec_quantity], ah
mov [secbuffer], bx
mov [sec_number], cl
mov [track_number], ch
mov [drive], dl
mov [head], dh
cmp cl, 0x12
jle __ishvara_fasm_if_end_13
mov al, 2
mov bx, MSG_READ_SECTOR_EXIT
int 0xff
mov ax, 1
ret

__ishvara_fasm_if_end_13:
cmp dh, 1
jle __ishvara_fasm_if_end_14
mov al, 2
mov bx, MSG_READ_SECTOR_HEAD_EXIT
int 0xff
mov ax, 2
ret

__ishvara_fasm_if_end_14:
mov al, 2
mov bx, MSG_READ_SECTOR
int 0xff

__ishvara_do_while_348:
dec [sec_quantity]
sti
mov dx, 0x3f2
mov al, RESET_CONTROLLER + USE_DMA + RUN_MOTOR
out dx, al
call __ishvara_waitLong
mov ah, 0xf
call __ishvara_out_fdc
mov ah, FLOPPY
call __ishvara_out_fdc
mov ah, [track_number]
call __ishvara_out_fdc
call __ishvara_wait_interrupt
call __ishvara_waitShort
mov al, [dma_command]
out 0xc, al
out 0xb, al
mov ax, [secbuffer]
mov bx, ds
mov cl, 4
rol bx, cl
mov dl, bl
and dl, 0xf
and bl, 0xf0
and ax, bx
jnc __ishvara_no_carry
inc dl

__ishvara_no_carry:
out 4, al
mov al, ah
out 4, al
mov al, dl
out 0x81, al
mov ax, 0x200 - 1
out 5, al
mov al, ah
out 5, al
mov al, 2
out 0xa, al
mov ah, [secread_com]
call __ishvara_out_fdc
mov ah, [head]
shl ah, 2
call __ishvara_out_fdc
mov ah, [track_number]
call __ishvara_out_fdc
mov ah, [head]
call __ishvara_out_fdc
mov ah, [sec_number]
call __ishvara_out_fdc
mov ah, 2
call __ishvara_out_fdc
mov ah, 0x12
call __ishvara_out_fdc
mov ah, 0x1B
call __ishvara_out_fdc
mov ax, 0xffff
call __ishvara_wait_interrupt
mov cx, 7
mov bx, status_buffer

__ishvara_do_while_431:
call __ishvara_in_fdc
mov [bx], al
inc bx
loop __ishvara_do_while_431
mov dx, 0x3f2
mov al, RESET_CONTROLLER + USE_DMA
out dx, al
add [secbuffer], 0x200
dec [sec_number]
cmp [sec_number], 0x12
jle __ishvara_fasm_if_else_18
dec [track_number]
mov [sec_number], 1
jmp __ishvara_fasm_if_end_18

__ishvara_fasm_if_else_18:
mov al, 0

__ishvara_fasm_if_end_18:
or al, [sec_quantity]
test al, al
jnz __ishvara_do_while_348
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

__ishvara_do_while_532:
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
jnz __ishvara_fasm_if_end_19
call __ishvara_incLine
mov bl, 0
call __ishvara_setColumn
call __ishvara_getLine
cmp al, 0x19
jnz __ishvara_fasm_if_end_20
call __ishvara_scroll
call __ishvara_decLine

__ishvara_fasm_if_end_20:
jmp __ishvara_do_while_condition_532

__ishvara_fasm_if_end_19:
cmp al, _backspace
jnz __ishvara_fasm_if_end_21
mov ah, al
call __ishvara_getColumn
xchg ah, al
call __ishvara_getMinColumn
cmp ah, al
jz __ishvara_fasm_if_end_22
call __ishvara_decColumn
call __ishvara_decColumn
sub di, 2

__ishvara_fasm_if_end_22:
jmp __ishvara_do_while_condition_532

__ishvara_fasm_if_end_21:
mov ah, al
call __ishvara_getColor
xchg ah, al
stosw
call __ishvara_incColumn

__ishvara_do_while_condition_532:
loop __ishvara_do_while_532
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
push bp
mov bp, sp
mov si, [bp + 4]
mov cx, -1
cld

__ishvara_do_while_691:
inc cx
lodsb
test al, al
jnz __ishvara_do_while_691
mov ax, cx
pop bp
ret 2
old_esi dw 0
old_ds dw 0
error_reading2 db 'error reading the file o_O', 0
buf rb 0x10
hi db 'Hello from Nemesis =)!', 0xd, 0
shell db 'SH3LL ', 0
EXECUTING db 'executing...', 0xd, 0
FOUND db 'found :)!', 0
NOT_FOUND db 'not found :(!', 0
exec_addr dw 0x500
MSG_EMPTY_READ_RESULT db 'find file: read sector: empty read result', 0xd, 0
MSG_NOT_EMPTY_READ_RESULT db 'find file: read sector: not empty read result', 0xd, 0
MSG_FIND_FILE_READ_SECTOR db 'find file: read sector', 0xd, 0
file_size dw 0
file_offset dw 0
file_sec_size db 0
REG db 0
MSG_READ_SECTOR_HEAD_EXIT db 'read sector: head > 1', 0xd, 0
MSG_READ_SECTOR_EXIT db 'read sector: exit: sector > 0x12', 0xd, 0
MSG_READ_SECTOR db 'read sector: enter', 0xd, 0
dma_command db 0x46
secread_com db 0xE6
head db 0
drive db 0
track_number db 0
sec_number db 0
secbuffer dw 0
sec_quantity db 0
status_buffer rb 7
backgroundColor db 0
textColor db 2
col db 0
maxCol db 0x4f
minCol db 0
maxLine db 0x18
minLine db 0
line db 3

