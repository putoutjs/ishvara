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

const checkNext = ({__a, __b}, path) => {
    if (__b.value && __b.value !== 0xff)
        return false;
    
    const reg = NEXT_REG[__a.name];
    
    if (!reg)
        return false;
    
    const next = path.parentPath.getNextSibling();
    
    return compare(next, `${reg} = ${__b.value}`);
};

export const report = () => `Assign two-bytes register instead of assigning one-byte registers twice`;

export const match = () => ({
    '__a = __b': checkNext,
});

export const replace = () => ({
    '__a = __b': removeNext,
});

const removeNext = ({__a, __b}, path) => {
    const next = path.parentPath.getNextSibling();
    const reg = REG[__a.name];
    
    remove(next);
    
    if (__b.value === 0xff)
        return `${reg} = 0xffff`;
    
    return `${reg} = 0`;
};
