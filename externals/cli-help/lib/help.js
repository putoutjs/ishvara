import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const helpList = require('./help.json');

const {entries} = Object;

export const help = () => {
    const result = [
        'Usage: ishvara [options] [input]',
        'Options:',
    ];
    
    for (const [name, description] of entries(helpList)) {
        result.push(`  ${name} ${description}`);
    }
    
    return result.join('\n');
};
