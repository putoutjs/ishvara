import {rollup} from 'rollup';
import resolve from '@rollup/plugin-node-resolve';

import tsParser from './ts-parser.js';

export const build = async (input) => {
    const bundle = await rollup({
        input,
        external: [
            '#operator-wasm',
        ],
        plugins: [
            resolve({
                extensions: ['.ts'],
            }),
            tsParser(),
        ],
    });
    
    const {output} = await bundle.generate({});
    
    await bundle.close();
    
    return output[0].code;
};

