import {readFileSync, writeFileSync} from 'node:fs';
import process from 'node:process';
import {codeFrameColumns} from '@putout/babel';
import {run} from '#runner-wasm';
import * as wasm from '#printer-wasm';
import * as fasm from '#printer-fasm';

const [target, name, flag] = process.argv.slice(2);

if (!name) {
    console.error('ishvara [input]');
    process.exit(1);
}

const source = readFileSync(name, 'utf8');
const type = parseType(flag);

const compiler = target === 'wasm' ? wasm : fasm;

const [binary, compilePlaces] = await compiler.compile(source, {
    name,
    type,
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

function parseType(flag) {
    if (flag === '--code')
        return 'code';
    
    if (flag === '--assembly')
        return 'assembly';
    
    if (flag === '--dump')
        return 'dump';
    
    return 'binary';
}
