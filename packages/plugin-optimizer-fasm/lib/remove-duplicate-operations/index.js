import {operator} from 'putout';

const {compare} = operator;

export const match = () => ({
    '__a(__b, __c)': (vars, path) => {
        const next = path.parentPath.getNextSibling();
        return compare(path, next);
    },
});

export const report = () => `Avoid duplicate operations`;

export const replace = () => ({
    '__a(__b, __c)': '',
});
