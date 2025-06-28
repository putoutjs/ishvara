import {operator} from 'putout';

const {compare} = operator;

export const report = () => `Split 'binary expression'`;

export const replace = () => ({
    '__a = __b + __c': ({__a, __b}) => {
        if (compare(__a, __b))
            return '__a += __c';
        
        return `{
    	__a = __b;
        __a += __c
    }`;
    },
});
