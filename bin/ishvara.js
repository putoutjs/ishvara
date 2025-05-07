import {readFileSync, writeFileSync} from 'node:fs';
import process from 'node:process';
import esbuild from 'esbuild';
import {codeFrameColumns} from '@putout/babel';
import {run} from '#runner-wasm';
import * as ishvara from '../packages/ishvara/ishvara.js';

const [target, name, flag] = process.argv.slice(2);

if (!name) {
    console.error('ishvara [input]');
    process.exit(1);
}

const outfile = name.replace(/\.ts$/, '.bundle.js');

esbuild.buildSync({
    entryPoints: [name],
    bundle: true,
    write: true,
    minify: false,
    outfile,
    target: ['node24'],
    platform: 'node',
    format: 'esm',
    external: [
        '#operator-wasm',
    ],
});

const source = readFileSync(outfile, 'utf8');
const type = parseType(flag);

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
    if (type === 'binary')
        process.stdout.write(binary);
    else
        console.log(codeFrameColumns(binary, {}, {
            highlightCode: true,
            forceColor: true,
        }));
    
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
