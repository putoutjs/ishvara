import {join} from 'node:path';
import process from 'node:process';
import {codeFrameColumns} from '@putout/babel';
import * as ishvara from 'ishvara';
import {bundle} from '@ishvara/bundler';

const {RAW, OUTPUT} = process.env;

export const compileExtension = (dir, {run, target}) => ({fail, equal}) => async (name, expected, main, args) => {
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
        target,
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
    
    if (target === 'wasm') {
        const result = [];
        const wasm = await run(binary, {
            console: {
                log: (a) => {
                    result.push(a);
                    return a;
                },
            },
        });
        
        wasm[main](...args);
        
        return equal(result.join('\n'), expected);
    }
    
    const result = await run(binary);
    return equal(result, expected);
};
