import {join} from 'node:path';
import process from 'node:process';
import * as ishvara from '#ishvara';
import {bundle} from '#bundler';
import {run} from '../emulator.js';

const {OUTPUT} = process.env;

export const compileExtension = (dir) => ({fail, equal}) => async (name, expected) => {
    const filePath = join(dir, name);
    const [error, bundled] = await bundle(filePath);
    
    if (error)
        return fail(error.message);
    
    const [binary, places] = await ishvara.compile(bundled, {
        target: 'fasm',
        type: OUTPUT,
    });
    
    OUTPUT && OUTPUT !== 'bundle';
    
    if (places.length)
        return fail(places[0].message);
    
    if (OUTPUT)
        return fail('output');
    
    const result = await run(binary);
    
    return equal(result, expected);
};
