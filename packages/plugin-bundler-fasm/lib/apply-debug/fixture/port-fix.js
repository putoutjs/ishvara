async function execute() {
    {
        pusha();
        ax = 0;
        ds = ax;
        si = __debug_1_hello_world;
        lodsb();
        while (al) {
            io.out(233, al);
            lodsb();
        }
        
        popa();
    }
}

let __debug_1_hello_world = [
    'hello world',
    0xa,
];
