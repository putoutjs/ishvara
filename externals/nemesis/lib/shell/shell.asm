org 0x500
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
_cmd_size equ 0x50

__ishvara_start:
mov al, 2
mov bx, hi
int 0xff
mov cl, 0x4f
mov ch, 0x18
mov bx, 1
mov al, 0xb
int 0xff

__ishvara_do_while_34:
mov al, 2

mov bx, prompt
int 0xff
push buffer
call __ishvara_clearBuffer
mov bx, buffer
mov cx, _cmd_size
mov al, 8
int 0xff
mov al, 2
mov bx, buffer
int 0xff
push buffer
push cmd_help
call __ishvara_strcmp
test al, al
jnz __ishvara_fasm_if_end_2
mov al, 2
mov bx, cmd_list
int 0xff
jmp __ishvara_do_while_condition_34

__ishvara_fasm_if_end_2:
jmp $


__ishvara_do_while_condition_34:
jmp __ishvara_do_while_34


__ishvara_strcmp:
push bp
mov bp, sp
xor ax, ax
mov si, [bp + 4]
mov di, [bp + 6]
cld

__ishvara_while_64:
lodsb

test al, al
jz __ishvara_while_end_64
cmp al, [di]
jz __ishvara_fasm_if_end_1
mov al, 1
jmp __ishvara_while_end_64

__ishvara_fasm_if_end_1:
inc di

jmp __ishvara_while_64

__ishvara_while_end_64:
pop bp

ret 4


__ishvara_clearBuffer:
push bp
mov bp, sp
mov di, [bp + 4]
mov al, 0

__ishvara_while_80:
mov al, [di]

test al, al
jz __ishvara_while_end_80
mov [di], 0
jmp __ishvara_while_80

__ishvara_while_end_80:
pop bp

ret 2

buffer rb _cmd_size + 1
prompt db ']', 0
cmd_list db 0xd, 'Help? Why not o_O?', 0xd, 'help   - show this screen ;)', 0xd, 'dir    - show the files in dir where you now', 0xd, 'cls    - will clear the screen', 0xd, 'reboot - reboot the computer', 0xd, 'color  - change text and background color', 0xd, 0xd, 0
cmd_help db 'help', 0
hi db 'Hi, I am Sh3ll. Type help for ', 'more information', 0xd, 0

