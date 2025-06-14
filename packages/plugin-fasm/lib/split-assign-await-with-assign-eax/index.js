const REGS_8BIT = [
    'al',
    'bl',
    'cl',
    'dl',
    'ah',
    'bh',
    'ch',
    'dh',
];

const is8bit = (name) => {
    return REGS_8BIT.includes(name);
};

export const report = () => `Get result from 'eax'`;

const getEax = (name) => {
    if (is8bit(name))
        return 'al';
    
    return 'ax';
};

export const replace = () => ({
    '__a = await __b(__args)': ({__a}) => {
        const eax = getEax(__a.name);
        
        return `{
            await __b(__args);
            __a = ${eax};
        }`;
    },
});
