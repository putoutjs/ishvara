import putout from 'putout';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as fasm from '#plugin-fasm';
import * as ishvara from '#plugin-ishvara';
import * as bundler from '#plugin-bundler-fasm';

const defaultConfig = {
    plugins: [],
};

const parseConfig = (config) => ({
    ...defaultConfig,
    ...config,
});

export const transform = (source, config) => {
    const {plugins} = parseConfig(config);
    const {code: bundled} = putout(source, {
        isTS: true,
        plugins: [
            ['ishvara/bundler-fasm', bundler],
        ],
    });
    
    const {code, places} = putout(bundled, {
        fixCount: 4,
        isTS: true,
        plugins: [
            ...plugins,
            ['remove-nested-blocks', removeNestedBlocks],
            ['ishvara/ishvara', ishvara],
            ['ishvara/fasm', fasm],
        ],
    });
    
    return [code, places];
};
