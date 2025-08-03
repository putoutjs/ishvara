UNKNOWN_CODE db 'Error: unknown interrupt code: ', 0
intCode dw 0
zero db 0

__ishvara_printfUnknownCode:
push bp
mov bp, sp
mov ax, [bp + 4]
add ax, 0x1e
mov [intCode], ax
mov al, 2
mov bx, UNKNOWN_CODE
int 0xff
pop bp
ret 2
