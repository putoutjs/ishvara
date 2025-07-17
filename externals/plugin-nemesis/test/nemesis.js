import {createTest} from '@putout/test';
import * as wastTS from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['wast-ts', wastTS],
    ],
});

test('plugin-nemesis: transform: convert-printf-to-int-0xff', (t) => {
    t.transform('convert-printf-to-int-0xff');
    t.end();
});

test('plugin-nemesis: transform: remove-useless-imports', (t) => {
    t.transform('remove-useless-imports');
    t.end();
});

test('plugin-nemesis: transform: convert-set-cursor-to-int-0xff', (t) => {
    t.transform('convert-set-cursor-to-int-0xff');
    t.end();
});

test('plugin-nemesis: transform: convert-exec-to-int-0xff', (t) => {
    t.transform('convert-exec-to-int-0xff');
    t.end();
});

test('plugin-nemesis: transform: convert-read-sector-to-int-0xff', (t) => {
    t.transform('convert-read-sector-to-int-0xff');
    t.end();
});

test('plugin-nemesis: transform: convert-find-file-to-int-0xff', (t) => {
    t.transform('convert-find-file-to-int-0xff');
    t.end();
});

test('plugin-nemesis: transform: convert-debug-to-printf', (t) => {
    t.transform('convert-debug-to-printf');
    t.end();
});

test('plugin-nemesis: transform: convert-set-color-to-0xff', (t) => {
    t.transform('convert-set-color-to-0xff');
    t.end();
});

test('plugin-nemesis: transform: convert-set-creen-size-to-0xff', (t) => {
    t.transform('convert-set-creen-size-to-0xff');
    t.end();
});

test('plugin-nemesis: transform: convert-gets-to-0xff', (t) => {
    t.transform('convert-gets-to-0xff');
    t.end();
});
