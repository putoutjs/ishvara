import {parseArgs, SET_COLOR} from '../api.js';

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
            al = ${SET_COLOR};
            int(0xff);
        }`;
    },
});
