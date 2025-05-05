import {readFileSync, writeFileSync} from 'node:fs';
import process from 'node:process';
import {
    translate,
    compile,
    run,
} from '#ishvara';

const [input] = process.argv.slice(2);

if (!input) {
    console.error('ishvara [input]');
    process.exit(1);
}

const source = readFileSync(input, 'utf8');

const wast = compile(source);
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
