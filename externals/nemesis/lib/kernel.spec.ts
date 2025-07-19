import {compile} from 'ishvara';
import {bundle} from '@ishvara/bundler';
import {test} from 'supertape';
import config from './.ishvara.json' with {type: 'json'};

test('ishvara: nemesis: kernel: bundle', async (t) => {
    const filePath = new URL('./kernel.ts', import.meta.url).pathname;
    const [error] = await bundle(filePath);
    
    t.notOk(error);
    t.end();
});

test('ishvara: nemesis: kernel: compile', async (t) => {
    const filePath = new URL('./kernel.ts', import.meta.url).pathname;
    const [, bundled] = await bundle(filePath);
    const [, places] = await compile(bundled, {
        target: 'fasm',
        config,
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
}, {
    timeout: 10_000,
});
