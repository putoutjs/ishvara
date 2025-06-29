import {dirname, join} from 'node:path';
import {createRequire} from 'node:module';
import process from 'node:process';
import tryCatch from 'try-catch';

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
    
    if (error.code === 'MODULE_NOT_FOUND')
        return [null, { }];
    
    return [error, options];
};
