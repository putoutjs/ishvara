import {readFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'supertape';
import * as ishvara from '#ishvara';
import {run} from './emulator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');

test('ishvara: emulator-fasm: x64', async (t) => {
    const x64 = readFixture('x64');
    const [binary] = await ishvara.compile(x64, {
        target: 'fasm',
    });
    
    const result = await run(binary);
    const expected = 'Hello 64-bit world!\n';
    
    t.equal(result, expected);
    t.end();
});
