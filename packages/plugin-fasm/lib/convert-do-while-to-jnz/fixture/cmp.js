import {io} from "@ishvara/operator-fasm";

 do {
    io.in(al, 0x60);
} while (al === 0xfa);