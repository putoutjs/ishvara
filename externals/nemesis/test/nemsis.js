import {createTest} from '@ishvara/test';
import {run} from '@ishvara/runner-fasm';
import montag from 'montag';
import config from '../lib/.ishvara.json' with { type: 'json' };

const {test} = createTest(import.meta.url, {
    config,
    target: 'fasm',
    run,
});

test('nemesis: sector', async ({compile}) => {
    const expected = montag`
        find file: read sector
        enter
    
    `;
    
    await compile('sector', expected);
});
