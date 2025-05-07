import * as fasm from '#compiler-fasm';
import {print} from '#printer-fasms';
import {translate} from '#translator-wasm';

export const compile = async (source, options) => {
    const {name, type = 'binary'} = options;
    const [code, compilePlaces] = fasm.compile(source);
    
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
