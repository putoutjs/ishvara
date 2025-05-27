import {types} from '@putout/babel';

const {
    isMemberExpression,
    isCallExpression,
} = types;

export const report = () => `Use 'mov()' instead of '='`;

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

