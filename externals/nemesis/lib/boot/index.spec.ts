import {compile} from 'ishvara';
import {bundle} from '@ishvara/bundler';
import {test} from 'supertape';

test('ishvara: nemesis: boot: bundle', async (t) => {
    const filePath = new URL('./index.js', import.meta.url).pathname;
    const [error] = await bundle(filePath);
    
    t.notOk(error);
    t.end();
});

test('ishvara: nemesis: boot: compile', async (t) => {
    const filePath = new URL('./index.js', import.meta.url).pathname;
    const [, bundled] = await bundle(filePath);
    const [, places] = await compile(bundled, {
        target: 'fasm',
    });
    
    t.notOk(places.length);
    t.end();
});

