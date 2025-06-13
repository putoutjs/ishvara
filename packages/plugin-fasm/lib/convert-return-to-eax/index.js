const i16 = [
    'ax',
    'bx',
    'cx',
    'dx',
    'di',
    'si',
];

export const report = () => `Use 'eax' instead of 'return'`;

export const replace = () => ({
    'return': 'ret()',
    'return __a': ({__a}) => {
        if (i16.includes(__a.name))
            return `{
                ax = __a;
                ret();
            }`;
        
        return `{
                eax = __a;
                ret();
        }`;
    },
});
