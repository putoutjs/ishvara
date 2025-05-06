import {readFileSync, writeFileSync} from 'node:fs';
import process from 'node:process';
import {Readable, Writable} from 'node:stream';
import {codeFrameColumns} from '@putout/babel';
import {run} from '#ishvara';
import * as wasm from '../lib/wasm.js';

const [name, flag] = process.argv.slice(2);

if (!name) {
    console.error('ishvara [input]');
    process.exit(1);
}

const source = readFileSync(name, 'utf8');
const target = parseTarget(flag);

const [binary, compilePlaces] = await wasm.compile(source, {
    name,
    target,
});

if (compilePlaces.length) {
    console.error(compilePlaces);
    process.exit(1);
}

if (flag) {
    if (target === 'binary') {
        process.stdout.write(binary);
    } else {
        const result = codeFrameColumns(binary, {}, {
            highlightCode: true,
            forceColor: true,
        });
        
        console.log(result);
    }
    
    process.exit();
}

if (target === 'binary') {
    write(name, 'wasm', binary);
    
    const y = run(binary, {
        console: {
            log: (a) => {
                console.log('wasm:', a);
                return a;
            },
        },
    });
    
    console.log('js:', y.x(1, 2));
}

if (target === 'assembly')
    write(name, 'wast', binary);

function write(input, extension, binary) {
    const name = input.replace('.wast.ts', `.${extension}`);
    writeFileSync(name, binary);
}

function parseTarget(flag) {
    if (flag === '--code')
        return 'code';
    
    if (flag === '--assembly')
        return 'assembly';
    
    if (flag === '--dump')
        return 'dump';
    
    return 'binary';
}
