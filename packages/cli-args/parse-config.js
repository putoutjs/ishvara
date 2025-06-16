import {dirname, join} from 'node:path';
import tryToCatch from 'try-to-catch';

export const parseConfig = async (name, {readConfig = _readConfig} = {}) => {
    const dir = dirname(name);
    const configPath = join(dir, '.ishvara.json');
    
    const [error, options] = await tryToCatch(readConfig, configPath);
    
    if (error.code === 'ERR_MODULE_NOT_FOUND')
        return [null, { }];
    
    return [error, options];
};

async function _readConfig(configPath) {
    return await import(configPath);
}
