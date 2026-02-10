import putout from 'putout';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as esm from '@putout/plugin-esm';
import * as ishvara from '@ishvara/plugin-ishvara';
import * as wasm from '@ishvara/plugin-wasm';

export const transform = (source) => {
    const {code, places} = putout(source, {
        fix: true,
        isTS: true,
        plugins: [
            ['ishvara/wasm', wasm],
            ['ishvara/ishvara', ishvara],
            ['esm', esm],
            ['remove-nested-blocks', removeNestedBlocks],
        ],
    });
    
    return [code, places];
};
