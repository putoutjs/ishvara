import putout from 'putout';
import * as plugin from '#plugin-wasm';

export const transform = (source) => {
    const {code, places} = putout(source, {
        fix: true,
        isTS: true,
        plugins: [
            ['ishvara/wasm', plugin],
        ],
    });
    
    return [code, places];
};
