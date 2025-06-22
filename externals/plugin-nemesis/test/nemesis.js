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
})
