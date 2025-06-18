import {is32bit, is8bit} from '../regs.js';

export const report = () => `Get result from 'eax'`;

const getEax = (name) => {
    if (is8bit(name))
        return 'al';
    
    if (is32bit(name))
        return 'eax';
    
    return 'ax';
};

export const replace = () => ({
    '__a = await __b(__args)': ({__a}) => {
        const eax = getEax(__a.name);
        
        return `{
            __a = ${eax};
            await __b(__args);
            xchg(__a, ${eax});
        }`;
    },
    '__a: __b = await __c(__args)': ({__b}) => {
        const eax = getEax(__b.name);
        
        return `{
            __b = ${eax};
            __a: await __c(__args);
            xchg(__b, ${eax});
        }`;
    },
});
