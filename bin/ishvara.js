import {readFileSync, writeFileSync} from 'node:fs';
import process from 'node:process';
import {translate, run} from '#ishvara';
import {
    compileToPlainWast,
    printWast,
} from '#compiler-wast';

const [input, flag] = process.argv.slice(2);

if (!input) {
    console.error('ishvara [input]');
    process.exit(1);
}

const source = readFileSync(input, 'utf8');
const [plainWast, compilePlaces] = compileToPlainWast(source);

if (compilePlaces.length) {
    console.error(compilePlaces);
    process.exit(1);
}

const wast = printWast(plainWast);

if (flag === '--plain-wast-ts') {
    console.log('----- start: plain-wast-ts ----');
    console.log(wast);
    console.log('----- end: plain-wast-ts ----');
    process.exit(0);
}

if (flag === '--wast') {
    console.log('----- start: wast ----');
    console.log(wast);
    console.log('----- end: wast ----');
    process.exit(0);
}

const [places, wasm] = await translate(input, wast);

if (places.length) {
    console.log(places);
    process.exit(1);
}

writeFileSync(input.replace('.wast.ts', '.wasm'), wasm);
writeFileSync(input.replace('.wast.ts', '.wast'), wast);

const y = run(wasm, {
    console: {
        log: (a) => {
            console.log('wasm:', a);
            return a;
        },
    },
});

console.log('js:', y.x(1, 2));
