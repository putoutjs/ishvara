import {translate} from '#translator-wasm';
import * as wast from '#compiler-wast';
import {print} from '../printer-wasm/printer.js';

export const compile = async (source, options) => {
    const {name, type = 'binary'} = options;
    
    const [code, compilePlaces] = wast.compile(source);
    
    if (compilePlaces.length)
        return [code, compilePlaces];
    
    if (type === 'code')
        return [code, compilePlaces];
    
    const assembly = print(code);
    
    if (type === 'assembly')
        return [
            assembly,
            [],
        ];
    
    const [binary, places] = await translate(assembly, {
        name,
        type,
    });
    
    return [binary, places];
};
