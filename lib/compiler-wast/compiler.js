import putout from 'putout';
import * as pluginWastTS from './putout-plugin-wast-ts/lib/index.js';
import {printWast} from './printer-wast/printer-wast.js';

export {
    printWast,
};

export const compileToPlainWast = (source) => {
    const {code, places} = putout(source, {
        fix: true,
        isTS: true,
        plugins: [
            ['wast-ts', pluginWastTS],
        ],
    });
    
    return [code, places];
};

export const compile = (source) => {
    const [, plainWastTs] = compileToPlainWast(source);
    return printWast(plainWastTs);
};
