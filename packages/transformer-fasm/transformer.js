import putout from 'putout';
import * as fasm from '#putout-plugin-fasm';

export const transform = (source) => {
    const {code} = putout(source, {
        isTS: true,
        plugins: [
            ['ishvara/fasm', fasm],
        ],
    });
    
    return code;
};
