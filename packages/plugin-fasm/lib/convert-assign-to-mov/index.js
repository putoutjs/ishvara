import {types} from '@putout/babel';

const {
    isMemberExpression,
    isCallExpression,
} = types;

export const report = (path) => {
    return `Use 'mov()' instead of '=' in '${path}'`;
};

export const match = () => ({
    '__a = __b': ({__a, __b}) => {
        if (isMemberExpression(__a))
            return false;
        
        return !isCallExpression(__b);
    },
});

export const replace = () => ({
    '__a = __b': 'mov(__a, __b)',
});
