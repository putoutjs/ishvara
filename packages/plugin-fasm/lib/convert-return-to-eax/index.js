import {types} from 'putout';

const {isIdentifier} = types;
const i16 = [
    'ax',
    'bx',
    'cx',
    'dx',
];

export const report = () => `Use 'eax' instead of 'return'`;

export const replace = () => ({
    'return __a': ({__a}, path) => {
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

