import {types, operator} from 'putout';

const {
    callExpression,
    labeledStatement,
    identifier,
    isLabeledStatement,
} = types;

const {replaceWith, insertAfter} = operator;

const createName = (suffix) => {
    return `__ishvara_fasm_if_${suffix}`;
};

export const report = () => `Use 'jmp' instead of 'if'`;

export const replace = ({options}) => {
    let {labelSuffix = 0} = options;
    
    return {
        'if (__a > __b) __c': (vars, path) => {
            const next = getNext(path);
            const name = createName(++labelSuffix);
            
            createLabel(next, name);
            
            return `{
                cmp(__a, __b);
                jle(${name});
                __c;
            }`;
        },
        'if (__a === __b) __c': (vars, path) => {
            const next = getNext(path);
            const name = createName(++labelSuffix);
            
            createLabel(next, name);
            
            return `{
                cmp(__a, __b);
                jnz(${name});
                __c;
            }`;
        },
        'if (__a !== __b) __c': (vars, path) => {
            const next = getNext(path);
            const name = createName(++labelSuffix);
            
            createLabel(next, name);
            
            return `{
                cmp(__a, __b);
                jz(${name});
                __c;
            }`;
        },
        'if (__a === __b) __c; else __d': (vars, path) => {
            const next = getNext(path);
            const name = createName(++labelSuffix);
            
            createLabel(next, name);
            
            return `{
                cmp(__a, __b);
                jnz(${name}_not_ok);
                __c;
                jmp(${name});
                ${name}_not_ok:
                __d;
            }`;
        },
    };
};

function createLabel(path, name) {
    const labelName = identifier(name);
    const label = labeledStatement(labelName, path.node);
    
    replaceWith(path, label);
}

const getLatestLabeledStatement = (path) => {
    do {
        path = path.parentPath;
    } while (isLabeledStatement(path.parentPath));
    return path;
};

function getNext(path) {
    const next = path.getNextSibling();
    
    if (next.node)
        return next;
    
    if (path.parentPath.isLabeledStatement())
        path = getLatestLabeledStatement(path);
    
    insertAfter(path, callExpression(identifier('nop'), []));
    
    return path.getNextSibling();
}
