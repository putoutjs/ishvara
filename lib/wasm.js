import {translate} from '#ishvara';
import * as wast from '#compiler-wast';
import {print} from './printer-wast/printer-wast.js';

export const compile = async (source, options) => {
    const {name, target = 'binary'} = options;
    
    const [code, compilePlaces] = wast.compile(source);
    
    if (compilePlaces.length)
        return [code, compilePlaces];
    
    if (target === 'code')
        return [code, compilePlaces];
    
    const assembly = print(code);
    
    if (target === 'assembly')
        return [
            assembly,
            [],
        ];
    
    const [binary, places] = await translate(name, assembly, {
        target,
    });
    
    return [binary, places];
};
