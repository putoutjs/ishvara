import putout from 'putout';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as fasm from '#plugin-optimizer-fasm';

export const optimize = (source) => {
    const {code, places} = putout(source, {
        isTS: true,
        plugins: [
            ['ishvara/optimizer-fasm', fasm],
            ['remove-nested-blocks', removeNestedBlocks],
        ],
    });
    
    return [code, places];
};
