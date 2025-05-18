import {transform} from '#transformer-fasm';
import {print} from '#printer-fasm';
import {translate} from '#translator-fasm';
import {optimize} from '#optimizer-fasm';

export const compile = async (source, options = {}) => {
    const {
        name,
        type = 'binary',
        optimization = true,
    } = options;
    
    const [code, compilePlaces] = transform(source);
    
    if (compilePlaces.length)
        return [code, compilePlaces];
    
    if (type === 'code')
        return [code, compilePlaces];
    
    const [optimized, optimizedPlaces] = optimization ? optimize(code) : [code, []];
    
    if (type === 'optimized')
        return [optimized, optimizedPlaces];
    
    const assembly = print(optimized);
    
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
