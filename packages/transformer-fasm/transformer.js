import putout from 'putout';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as fasm from '#plugin-fasm';
import * as ishvara from '#plugin-ishvara';
import * as bundler from '#plugin-bundler-fasm';

export const transform = (source) => {
    const {code: bundled} = putout(source, {
        plugins: [
            ['ishvara/bundler-fasm', bundler],
        ],
    });
    
    const {code, places} = putout(bundled, {
        fixCount: 4,
        isTS: true,
        plugins: [
            ['remove-nested-blocks', removeNestedBlocks],
            ['ishvara/ishvara', ishvara],
            ['ishvara/fasm', fasm],
        ],
    });
    
    return [code, places];
};
