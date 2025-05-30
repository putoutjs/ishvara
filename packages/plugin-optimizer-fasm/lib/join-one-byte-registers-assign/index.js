import {operator} from 'putout';

const {remove, compare} = operator;

const NEXT_REG = {
    al: 'ah',
    ah: 'al',
    bl: 'bh',
    bh: 'bl',
    cl: 'ch',
    ch: 'cl',
    dl: 'dh',
    dh: 'dl',
};

const REG = {
    al: 'ax',
    ah: 'ax',
    bl: 'bx',
    bh: 'bx',
    cl: 'cx',
    ch: 'cx',
    dl: 'dx',
    dh: 'dx',
};

const checkNext = ({__a, __b, __c}, path) => {
    if (__a.name === 'mov') {
        if (__c.value && __c.value !== 0xff)
            return false;
        
        const reg = NEXT_REG[__b.name];
        
        if (!reg)
            return false;
        
        const next = path.parentPath.getNextSibling();
        
        return compare(next, `mov(${reg}, ${__c.value})`);
    }
    
    if (__a.name === 'xor') {
        if (__b.name !== __c.name)
            return false;
        
        const reg = NEXT_REG[__b.name];
        
        if (!reg)
            return false;
        
        const next = path.parentPath.getNextSibling();
        
        return compare(next, `xor(${reg}, ${reg})`);
    }
    
    return false;
};

export const report = () => `Assign two-bytes register instead of assigning one-byte registers twice`;

export const match = () => ({
    '__a(__b, __c)': checkNext,
});

export const replace = () => ({
    '__a(__b, __c)': removeNext,
});

const removeNext = ({__a, __b, __c}, path) => {
    const next = path.parentPath.getNextSibling();
    const reg = REG[__b.name];
    
    remove(next);
    
    if (__a.name === 'xor')
        return `xor(${reg}, ${reg})`;
    
    if (__c.value === 0xff)
        return `mov(${reg}, 0xffff)`;
    
    return `mov(${reg}, 0)`;
};
