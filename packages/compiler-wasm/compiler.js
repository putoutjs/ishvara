import {translate} from '#translator-wasm';
import {transform} from '#transformer-wasm';
import {print} from '#printer-wasm';

export const compile = async (source, options = {}) => {
    const {name, type = 'binary'} = options;
    const [code, compilePlaces] = transform(source);
    
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
