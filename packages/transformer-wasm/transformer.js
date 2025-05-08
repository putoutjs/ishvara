import putout from 'putout';
import * as esm from '@putout/plugin-esm';
import * as plugin from '#plugin-wasm';

export const transform = (source) => {
    const {code, places} = putout(source, {
        fix: true,
        isTS: true,
        plugins: [
            ['ishvara/wasm', plugin],
            ['esm', esm],
        ],
    });
    
    return [code, places];
};

