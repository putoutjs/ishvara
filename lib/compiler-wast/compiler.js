import putout from 'putout';
import * as pluginWastTS from './putout-plugin-wast-ts/lib/index.js';

export const compile = (source) => {
    const {code, places} = putout(source, {
        fix: true,
        isTS: true,
        plugins: [
            ['wast-ts', pluginWastTS],
        ],
    });
    
    return [code, places];
};
