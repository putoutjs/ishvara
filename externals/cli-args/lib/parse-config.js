import {dirname, join} from 'node:path';
import {createRequire} from 'node:module';
import process from 'node:process';
import tryCatch from 'try-catch';

const {assign} = Object;
const require = createRequire(import.meta.url);

export const parseConfig = (name, overrides = {}) => {
    const {
        cwd = process.cwd,
        readConfig = require,
        env = process.env,
    } = overrides;
    
    const debug = Boolean(Number(env.DEBUG));
    const dir = dirname(name);
    const configPath = join(cwd(), dir, '.ishvara.json');
    
    const [error, options = {}] = tryCatch(readConfig, configPath);
    
    assign(options, {
        debug,
    });
    
    return [error, options];
};
