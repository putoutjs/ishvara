import putout from 'putout';
import * as pluginWastTS from '#putout-plugin-wast';

export const transform = (source) => {
    const {code, places} = putout(source, {
        fix: true,
        isTS: true,
        plugins: [
            ['ishvara/wast', pluginWastTS],
        ],
    });
    
    return [code, places];
};
