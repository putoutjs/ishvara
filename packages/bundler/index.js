import {rollup} from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import tsParser from './ts-parser.js';

export const bundle = async (input) => {
    const bundle = await rollup({
        input,
        treeshake: {
            moduleSideEffects: true,
        },
        external: [
            '#operator-wasm',
            '#operator-fasm',
        ],
        plugins: [
            resolve({
                extensions: ['.ts'],
            }),
            tsParser(), {
                name: 'disable-treeshake',
                transform(code) {
                    return {
                        code,
                        map: null,
                        moduleSideEffects: 'no-treeshake',
                    };
                },
            },
        ],
    });
    
    const {output} = await bundle.generate({});
    
    await bundle.close();
    
    return output[0].code;
};
