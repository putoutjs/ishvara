import {join} from 'node:path';
import process from 'node:process';
import {codeFrameColumns} from '@putout/babel';
import * as ishvara from '#ishvara';
import {bundle} from '#bundler';
import {run} from '../emulator.js';

const {RAW, OUTPUT} = process.env;

export const compileExtension = (dir) => ({fail, equal}) => async (name, expected) => {
    const filePath = join(dir, name);
    const [error, bundled] = await bundle(filePath);
    
    if (OUTPUT === 'bundle')
        console.log(codeFrameColumns(bundled, {}, {
            highlightCode: true,
            forceColor: true,
        }));
    
    if (error)
        return fail(error.message);
    
    const [binary, places] = await ishvara.compile(bundled, {
        target: 'fasm',
        type: OUTPUT,
    });
    
    if (OUTPUT && OUTPUT !== 'bundle')
        if (RAW)
            console.log(binary);
        else
            console.log(codeFrameColumns(binary, {}, {
                highlightCode: true,
                forceColor: true,
            }));
    
    if (places.length)
        return fail(places[0].message);
    
    const result = await run(binary);
    
    return equal(result, expected);
};
