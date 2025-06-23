org 0x7c00
use16

__ishvara_boot:
jmp __ishvara_start
line db 0
bpbOEM db 'nemesis '
bpbSectSize dw 0x200
bpbClustSize db 1
bpbReservedSec dw 1
bpbFats db 2
bpbRootSize dw 0xe0
bpbTotalSect dw 0xb40
bpbMedia db 0xf0
bpbFatSize dw 9
bpbTrackSect dw 0x12
bpbHeads dw 2
bpbHiddenSect dd 0
kernel_offset dw 0
kernel_size dw 0
bpbDriveNo db 0
kernel_sec_size db 0
bpbSignature db 0x29
bpbID dd 1
bpbVolumeLabel db 'BOOT FLOPPY'
bpbFileSystem db 'FAT12   '
kernel_begin equ 0x7e00

__ishvara_start:
xor ax, ax
mov ds, ax
mov es, ax
mov ss, ax
dec ax
mov sp, 0x7c00
mov ax, 3
int 0x10
push loader_name
call __ishvara_printf
mov al, 1
mov bx, kernel_begin
mov cx, 2
mov dl, 0
mov dh, 1
mov ah, 2
int 0x13
jnc __ishvara_read_sector_ok_49
mov al, 1
jmp __ishvara_read_sector_end_49

__ishvara_read_sector_ok_49:
xor ax, ax

__ishvara_read_sector_end_49:
clc
test ax, ax
jz __ishvara_fasm_if_end_1
push error_reading
call __ishvara_printf
call __ishvara_reboot
ret

__ishvara_fasm_if_end_1:
mov bx, kernel_begin

__ishvara_do_while_67:
mov di, kernel_name
push di
call __ishvara_getStringLength
mov cx, ax
mov si, bx
repe cmpsb
test cx, cx
jz __ishvara_fasm_if_end_5
add bx, 0x20
mov si, bx
lodsb
test al, al
jnz __ishvara_fasm_if_end_6
push error_finding
call __ishvara_printf
call __ishvara_reboot
ret

__ishvara_fasm_if_end_6:
__ishvara_fasm_if_end_5:
test cx, cx
jnz __ishvara_do_while_67
add si, 0x14
lodsw
mov [kernel_offset], ax
lodsw
mov [kernel_size], ax
mov cx, 0x200
cwd
div cx
test dx, dx
jz __ishvara_fasm_if_end_2
inc al

__ishvara_fasm_if_end_2:
mov [kernel_sec_size], al
push kernel_found
call __ishvara_printf
mov cx, 3

__ishvara_do_while_103:
push cx
mov bx, kernel_begin
mov ax, [kernel_offset]
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
push bx
mov bx, 2
div bx
mov ch, al
pop bx
pop dx
cmp dx, 1
jnz __ishvara_fasm_if_else_7
mov dh, 1
jmp __ishvara_fasm_if_end_7

__ishvara_fasm_if_else_7:
mov dh, 0

__ishvara_fasm_if_end_7:
mov al, [kernel_sec_size]
mov dl, 0
mov ah, 2
int 0x13
jnc __ishvara_read_sector_ok_134
mov al, 1
jmp __ishvara_read_sector_end_134

__ishvara_read_sector_ok_134:
xor ax, ax

__ishvara_read_sector_end_134:
clc
test ax, ax
jnz __ishvara_fasm_if_end_8
push kernel_load
call __ishvara_printf
jmp kernel_begin

__ishvara_fasm_if_end_8:
pop cx
loop __ishvara_do_while_103
test ax, ax
jz __ishvara_fasm_if_end_3
push error_krnlfile
call __ishvara_printf
call __ishvara_reboot
ret

__ishvara_fasm_if_end_3:
ret

__ishvara_reboot:
push press_any_key
call __ishvara_printf
xor ax, ax
int 0x16
jmp far 0xFFFF:0x0000
__ishvara_printf:
pop si
pop bp
push si
mov cx, ax
push bp
call __ishvara_getStringLength
xchg cx, ax
mov bx, 2
mov dl, 0
mov dh, [line]
mov ax, 0x1301
int 0x10
cmp dh, 0x17
jnz __ishvara_fasm_if_end_4
mov bh, 0x02
xor cx, cx
mov ax, 0x601
mov dx, 0x184f
int 0x10
ret

__ishvara_fasm_if_end_4:
inc dh
mov [line], dh
ret

__ishvara_getStringLength:
push bp
mov bp, sp
mov si, [bp + 4]
mov cx, -1
cld

__ishvara_do_while_192:
lodsb
inc cx
test al, al
jnz __ishvara_do_while_192
pop bp
mov ax, cx
ret 2
kernel_name db 'KERNEL', 0
kernel_load db 'kernel load', 0
error_krnlfile db 'kernel not load', 0
error_finding db 'error: kernel not found', 0
kernel_found db 'kernel found', 0
error_reading db 'error: read', 0
loader_name db 'Nemesis Loader o_O', 0
press_any_key db 'press any key', 0
rb 0x200 - ($ - __ishvara_boot) - 2
db 0x55, 0xaa

