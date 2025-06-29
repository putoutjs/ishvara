import * as wasm from '../../../packages/compiler-wasm/compiler.js';
import * as fasm from '../../../packages/compiler-fasm/compiler.js';

export const compile = async (source, options) => {
    const {
        target,
        type,
        name,
        optimization,
        config,
        onStageChange,
    } = options;
    
    if (target === 'wasm')
        return await wasm.compile(source, {
            type,
            name,
            optimization,
            onStageChange,
        });
    
    return await fasm.compile(source, {
        type,
        target,
        optimization,
        config,
        onStageChange,
    });
};
