import {operator} from 'putout';

const {remove, compare} = operator;

export const report = () => `Avoid useless 'if condition'`;

export const match = () => ({
    'if (__a.__b(__c, __d)) return 1': (vars, path) => {
        return true;
        const next = path.getNextSibling();
        
        return compare(next, 'return 0');
    },
});

export const replace = () => ({
    'if (__a.__b(__c.__d(__e), __f.__g(__h))) return __i.const(1)': (vars, path) => {
        const next = path.getNextSibling();
        remove(next);
        
        return '__a.__b(__c.__d(__e), __f.__g(__h))';
    },
    'if (__a.__b(__c, __d)) return 1': (vars, path) => {
        const next = path.getNextSibling();
        remove(next);
        
        return '__a.__b(__c, __d)';
    },
});
