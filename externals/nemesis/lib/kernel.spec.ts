import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createRequire} from 'node:module';
import {compile} from 'ishvara';
import {bundle} from '@ishvara/bundler';
import {test} from 'supertape';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);

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
        config: require('./.ishvara.json'),
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
}, {
    timeout: 10_000,
});
