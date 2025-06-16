import {operator, types} from 'putout';
import {SET_CURSOR} from '../api.js';

const {isArrayExpression} = types;
const {extract} = operator;

export const report = () => `Use '0xff' instead of 'nemesis.setCursor'`;

export const replace = () => ({
    'nemesis.setCursor(__object)': ({__object}, path) => {
        const {column, line} = parseArgs(__object);
        
        return `{
            bl = ${column};
            bh = ${line};
            al = ${SET_CURSOR};
            int(0xff);
        }`;
    },
});

function parseArgs({properties}) {
    const result = {};
    
    for (const {key, value} of properties) {
        const extracted = extract(value);
        
        if (isArrayExpression(value)) {
            result[key.name] = `[${extracted}]`;
            continue;
        }
        
        result[key.name] = extracted;
    }
    
    return result;
}

