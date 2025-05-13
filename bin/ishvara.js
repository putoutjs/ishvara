import {writeFileSync} from 'node:fs';
import process from 'node:process';
import {stat} from 'node:fs/promises';
import {codeFrameColumns} from '@putout/babel';
import tryToCatch from 'try-to-catch';
import {run} from '#runner-wasm';
import * as ishvara from '../packages/ishvara/ishvara.js';
import {build} from '../packages/bundle/bundle.js';

const {RAW} = process.env;

const [target, name, flag] = process.argv.slice(2);

if (!name) {
    console.error('ishvara [input]');
    process.exit(1);
}

const type = parseType(flag);

const [error] = await tryToCatch(stat, name);

if (error) {
    console.error(error.message);
    process.exit(1);
}

const source = await build(name);

if (type === 'bundle') {
    console.log(codeFrameColumns(source, {}, {
        highlightCode: true,
        forceColor: true,
    }));
    process.exit();
}

const [binary, compilePlaces] = await ishvara.compile(source, {
    name,
    type,
    target,
});

if (compilePlaces.length) {
    console.error(compilePlaces);
    process.exit(1);
}

if (flag) {
    if (type === 'binary' || RAW)
        process.stdout.write(binary);
    else
        console.log(codeFrameColumns(binary, {}, {
            highlightCode: true,
            forceColor: true,
        }));
    
    process.exit();
}

if (type === 'binary')
    if (target === 'fasm') {
        writeFileSync(name.replace('.ts', `.bin`), binary);
    } else if (target === 'wasm') {
        write(name, target, binary);
        
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

if (type === 'assembly')
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
    
    if (flag === '--bundle')
        return 'bundle';
    
    return 'binary';
}
