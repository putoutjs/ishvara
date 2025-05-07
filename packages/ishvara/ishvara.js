import * as wasm from '#compiler-wasm';
import * as fasm from '#compiler-fasm';

export const compile = (source, options) => {
    const {
        target,
        type,
        name,
    } = options;
    
    if (target === 'wasm')
        return wasm.compile(source, {
            type,
            name,
        });
    
    return fasm.compile(source, {
        type,
    });
};
