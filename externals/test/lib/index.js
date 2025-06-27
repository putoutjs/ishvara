import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {extend} from 'supertape';
import {compileExtension} from './compile-extension.js';

export const createTest = (url, {run, target}) => {
    const __filename = fileURLToPath(url);
    const dir = dirname(__filename);
    const dirFixture = join(dir, 'fixture');
    
    const test = extend({
        compile: compileExtension(dirFixture, {
            run,
            target,
        }),
    });
    
    return {
        test,
    };
};
