import {transform} from '#transformer-fasm';
import {print} from '#printer-fasm';
import {translate} from '#translator-fasm';

export const compile = async (source, options) => {
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
