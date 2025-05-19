import putout from 'putout';
import * as wasm from '#plugin-optimizer-wasm';

export const optimize = (source) => {
    const {code, places} = putout(source, {
        isTS: true,
        plugins: [
            ['ishvara/optimizer-wasm', wasm],
        ],
    });
    
    return [code, places];
};
