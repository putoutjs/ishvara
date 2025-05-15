import {createTest} from '@putout/test';
import * as wastTS from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['wast-ts', wastTS],
    ],
});

test('ishvara: putout-wast: apply-putout-wast-import', (t) => {
    t.transform('apply-putout-wast-import');
    t.end();
});

test('ishvara: putout-wast: convert-var-to-const', (t) => {
    t.transform('convert-var-to-const');
    t.end();
});

test('plugin-wasm: transform: remove-useless-esbuild-suffix', (t) => {
    t.transform('remove-useless-esbuild-suffix');
    t.end();
});

test('plugin-wasm: transform: convert-const-to-local', (t) => {
    t.transform('convert-const-to-local');
    t.end();
});

test('plugin-wasm: transform: move-local-on-top', (t) => {
    t.transform('move-local-on-top');
    t.end();
});

test('plugin-wasm: transform: convert-string-to-identifier-inside-call', (t) => {
    t.transform('convert-string-to-identifier-inside-call');
    t.end();
});
