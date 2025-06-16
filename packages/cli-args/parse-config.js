import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import process from 'node:process';
import tryToCatch from 'try-to-catch';
import tryCatch from 'try-catch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

export const parseConfig = (name, overrides = {}) => {
    const {
        cwd = process.cwd,
        readConfig = require,
    } = overrides;
    
    const dir = dirname(name);
    const configPath = join(cwd(), dir, '.ishvara.json');
    
    const [error, options] = tryCatch(readConfig, configPath);
    
    if (!error)
        return [null, options];
    
    if (error.code === 'ERR_MODULE_NOT_FOUND')
        return [null, {}];
    
    return [error, options];
};

async function _readConfig(configPath) {
    return await import(configPath);
}

