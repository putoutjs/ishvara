import {readFile} from 'node:fs/promises';
import {createTest} from '@ishvara/test';
import {run} from '@ishvara/runner-fasm';
import montag from 'montag';
import config from '../.ishvara.json' with {
    type: 'json',
};

const {test} = createTest(import.meta.url, {
    config,
    target: 'fasm',
    run,
});

test.skip('nemesis: sector', async ({compile}) => {
    const expected = montag`
        find file: read sector
        enter
        before interrupt
    
    `;
    
    await compile('sector', expected);
});

test.skip('nemesis: floppy', async (t) => {
    const expected = montag`
        executing...
        find file: read sector
        enter
        before interrupt
    
    `;
    
    const floppy = await readFile(new URL('../build/nemesis-debug.img', import.meta.url).pathname);
    const result = await run(floppy);
    
    t.equal(result, expected);
    t.end();
});
