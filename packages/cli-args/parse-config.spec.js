import {fileURLToPath} from 'node:url';
import {test, stub} from 'supertape';
import {parseConfig} from './parse-config.js';

const __filename = fileURLToPath(import.meta.url);

test('ishvara: cli-options: parse-options', async (t) => {
    const [, result] = await parseConfig(__filename);
    const expected = {};
    
    t.deepEqual(result, expected);
    t.end();
});

test('ishvara: cli-options: parse-options: options', async (t) => {
    const originalError = Error('parse error');
    const readConfig = stub().throws(originalError);
    const [error] = await parseConfig(__filename, {
        readConfig,
    });
    
    t.equal(error, originalError);
    t.end();
});

