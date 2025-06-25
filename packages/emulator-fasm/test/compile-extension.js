import {join} from 'node:path';
import * as ishvara from '#ishvara';
import {bundle} from '#bundler';
import {run} from '../emulator.js';

export const compileExtension = (dir) => ({fail, equal}) => async (name, expected) => {
    const filePath = join(dir, name);
    const [error, bundled] = await bundle(filePath);
    
    if (error)
        return fail(error.message);
    
    const [binary, places] = await ishvara.compile(bundled, {
        target: 'fasm',
    });
    
    if (places.length)
        return fail(places[0].message);
    
    const result = await run(binary);
    
    return equal(result, expected);
};
