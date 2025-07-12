import {readFile, writeFile} from 'node:fs/promises';
import {deflate, unzip} from 'node:zlib';
import {promisify} from 'node:util';
import {test} from 'supertape';
import {format} from '../lib/format.js';

const pack = promisify(deflate);

test('ishvara: format-floppy: boot', async (t) => {
    const boot = Buffer.from('hello');
    const floppy = await format({
        boot,
    });
    
    const sector = floppy.subarray(0, boot.length);
    
    t.deepEqual(sector, boot);
    t.end();
});

test('ishvara: format-floppy: no boot', async (t) => {
    const kernel = Buffer.from('kernel');
    const floppy = await format({
        files: {
            kernel,
        },
    });
    
    const result = await pack(floppy);
    const fixture = await readFile(new URL('fixture/fat-small.img.zip', import.meta.url).pathname);
    
    t.equal(result.length, fixture.length);
    t.end();
});

