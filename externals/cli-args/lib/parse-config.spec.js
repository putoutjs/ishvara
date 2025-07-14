import {fileURLToPath} from 'node:url';
import {test, stub} from 'supertape';
import {parseConfig} from './parse-config.js';

const {assign} = Object;

const __filename = fileURLToPath(import.meta.url);

test('ishvara: cli-options: parse-options', async (t) => {
    const [, result] = await parseConfig(__filename);
    const expected = {
        debug: false,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('ishvara: cli-options: parse-options: debug: 1', (t) => {
    const env = {
        DEBUG: '1',
    };
    
    const [, result] = parseConfig(__filename, {
        env,
    });
    
    const expected = {
        debug: '1',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('ishvara: cli-options: parse-options: debug', (t) => {
    const env = {
        DEBUG: '2',
    };
    
    const [, result] = parseConfig(__filename, {
        env,
    });
    
    const expected = {
        debug: '2',
    };
    
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

test('ishvara: cli-options: parse-options: options: not found', async (t) => {
    const originalError = Error('parse error');
    
    assign(originalError, {
        code: 'MODULE_NOT_FOUND',
    });
    
    const readConfig = stub().throws(originalError);
    
    const [error] = await parseConfig(__filename, {
        readConfig,
    });
    
    t.notOk(error);
    t.end();
});
