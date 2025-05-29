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
mov sp, ax
mov ax, 3
int 0x10
push loader_name
call __ishvara_printf

__ishvara_sec_reading:
mov al, 1
mov bx, kernel_begin
mov cl, 2
mov ch, 0
xor dx, dx
inc dh
mov ah, 2
int 0x13
jnc __ishvara_read_sector_ok_53
mov al, 1
jmp __ishvara_read_sector_end_53

__ishvara_read_sector_ok_53:
xor ax, ax

__ishvara_read_sector_end_53:
clc
test al, al
jz __ishvara_fasm_if_61
push error_reading
call __ishvara_printf
call __ishvara_reboot
ret

__ishvara_fasm_if_61:
__ishvara_find_file:
mov bx, kernel_begin

__ishvara_find_file_next:
mov di, kernel_name
push di
call __ishvara_getStringLength
mov cx, ax
mov si, bx
repe cmpsb
test cx, cx
jz __ishvara_fasm_if_85
add bx, 0x20
mov si, bx
lodsb
test al, al
jnz __ishvara_fasm_if_74
push error_finding
call __ishvara_printf
call __ishvara_reboot
ret

__ishvara_fasm_if_74:
jmp __ishvara_find_file_next
ret

__ishvara_fasm_if_85:
__ishvara_find_kernel:
add si, 0x14
lodsw
mov [kernel_offset], ax
lodsw
mov [kernel_size], ax
mov cx, 0x200
cwd
div cx
or dx, dx
jz __ishvara_bez_ostatka
inc al

__ishvara_bez_ostatka:
mov [kernel_sec_size], al
push kernel_fined
call __ishvara_printf
mov cx, 3

__ishvara_sec_reading2:
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
or dl, dl
jnz __ishvara_not_sec1

__ishvara_not_sec1:
inc dl
mov cl, dl
mov dx, ax
push dx
push bx
mov bx, 2
cwd
div bx
mov ch, al
mul bx
pop bx
pop dx
cmp dx, 1
jnz __ishvara_not_twin
jmp __ishvara_twin

__ishvara_not_twin:
mov dh, 0
jmp __ishvara_not_twin_ok

__ishvara_twin:
mov dh, 1

__ishvara_not_twin_ok:
mov dl, 0
mov al, [kernel_sec_size]
mov ah, 2
int 0x13
jnc __ishvara_read_sector_ok_154
mov al, 1
jmp __ishvara_read_sector_end_154

__ishvara_read_sector_ok_154:
xor ax, ax

__ishvara_read_sector_end_154:
clc
test ax, ax
jz __ishvara_fasm_if_156
pop cx
loop __ishvara_sec_reading2
push error_krnlfile
call __ishvara_printf
call __ishvara_reboot

__ishvara_fasm_if_156:
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
push bp
call __ishvara_getStringLength
mov cx, ax
mov bh, 0
mov bl, 2
mov dl, 0
mov dh, [line]
mov ax, 0x1301
int 0x10
cmp dh, 0x17
jnz __ishvara_fasm_if_184
mov bh, 0x02
xor cx, cx
mov ax, 0x601
mov dx, 0x184f
int 0x10
ret

__ishvara_fasm_if_184:
inc dh
mov [line], dh
ret

__ishvara_getStringLength:
pop ax
pop si
push ax
mov cx, -1

__ishvara_do_while_200:
lodsb
inc cx
test al, al
jnz __ishvara_do_while_200
mov ax, cx
ret
loader_name db 'Nemesis Loader', 0
error_reading db 'error: read', 0
kernel_fined db 'kernel found', 0
error_finding db 'error: kernel not found', 0
error_krnlfile db 'kernel not load :(', 0
kernel_load db 'kernel loaded :)', 0
press_any_key db 'press any key', 0
kernel_name db 'KERNEL', 0
rb 0x200 - ($ - __ishvara_boot) - 2
db 0x55, 0xaa

