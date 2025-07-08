import {operator, types} from 'putout';

const {isArrayExpression} = types;
const {extract} = operator;

const GREEN = 2;
const BLACK = 0;

export const report = () => `Use '0xff' instead of 'nemesis.setColor()'`;

export const replace = () => ({
    'nemesis.setColor()': () => {
        return `{
        	cl = ${GREEN}
            ch = ${BLACK};
            al = 6;
            int(0xff);
        }`;
    },
    'nemesis.setColor(__object)': ({__object}) => {
        const {
            color = GREEN,
            background = BLACK,
        } = parseArgs(__object);
        
        return `{
        	cl = ${color}
            ch = ${background};
            al = 6;
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
