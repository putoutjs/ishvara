declare global {
    var al: any;
    var ah: any;
    var ax: number | number[];
    var si: number;
    var cl: number;
    var cx: number;
    var bx: number;
    var ch: number;
    var di: number;
    var es: unknown;
    var cs: unknown;
    var $: number;
    
    var mov: (a, b) => void;
    var inc: (b) => void;
    var lodsb: () => void;
    var cli: () => void;
    var sti: () => void;
    var push: (a) => void;
    var pop: (a) => void;
    var jmp: (a) => void;
}
