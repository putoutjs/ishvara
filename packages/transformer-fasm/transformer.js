import putout from 'putout';
import * as fasm from '#plugin-fasm';

export const transform = (source) => {
    const {code, places} = putout(source, {
        isTS: true,
        plugins: [
            ['ishvara/fasm', fasm],
        ],
    });
    
    return [code, places];
};
