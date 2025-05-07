import {
    Decoder,
    DecoderOptions,
    Formatter,
    FormatterSyntax,
} from 'iced-x86';

export const dump = (exampleCode) => {
    const exampleBitness = 64;
    const exampleRip = 0x00007FFAC46ACDA4n;
    const hexBytesColumnByteLength = 10;
    
    const decoder = new Decoder(exampleBitness, exampleCode, DecoderOptions.None);
    
    decoder.ip = exampleRip;
    // This decodes all bytes. There's also `decode()` which decodes the next instruction,
    // `decodeInstructions(count)` which decodes `count` instructions and `decodeOut(instruction)`
    // which overwrites an existing instruction.
    const instructions = decoder.decodeAll();
    
    // Create a nasm formatter. It supports: Masm, Nasm, Gas (AT&T) and Intel (XED).
    // There's also `FastFormatter` which uses less code (smaller wasm files).
    //     const formatter = new FastFormatter();
    const formatter = new Formatter(FormatterSyntax.Nasm);
    
    // Change some options, there are many more
    formatter.digitSeparator = '`';
    formatter.firstOperandCharIndex = 10;
    // Format the instructions
    
    const output = instructions.map((instruction) => {
        // Eg. "00007FFAC46ACDB2 488DAC2400FFFFFF     lea       rbp,[rsp-100h]"
        let line = ('000000000000000' + instruction.ip.toString(16))
            .substr(-16)
            .toUpperCase();
        
        line += ' ';
        const startIndex = Number(instruction.ip - exampleRip);
        
        for (const b of exampleCode.slice(startIndex, startIndex + instruction.length)) {
            line += ('0' + b.toString(16))
                .substr(-2)
                .toUpperCase();
        }
        
        for (let i = instruction.length; i < hexBytesColumnByteLength; i++)
            line += '  ';
        
        line += ' ';
        line += formatter.format(instruction);
        
        return line;
    });
    
    // Free wasm memory
    for (const instruction of instructions)
        instruction.free();
    
    formatter.free();
    decoder.free();
    
    return output.join('\n');
};
