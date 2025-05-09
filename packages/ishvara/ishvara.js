import * as wasm from '#compiler-wasm';
import * as fasm from '#compiler-fasm';

export const compile = async (source, options) => {
    const {
        target,
        type,
        name,
    } = options;
    
    if (target === 'wasm')
        return await wasm.compile(source, {
            type,
            name,
        });
    
    return await fasm.compile(source, {
        type,
    });
};
