import {types, operator} from 'putout';

const {
    callExpression,
    labeledStatement,
    identifier,
} = types;

const {replaceWith, insertAfter} = operator;

const getStart = (path, suffix) => {
    if (!path.node)
        return suffix;
    
    const {loc} = path.node;
    
    if (loc)
        return loc.start.line;
    
    const prev = path.getPrevSibling();
    
    return prev.node.loc.start.line;
};

const createName = (path, prefix) => {
    const line = getStart(path, prefix);
    
    return `__ishvara_fasm_if_${line}`;
};

export const report = () => `Use 'jmp' instead of 'if'`;

export const replace = ({options}) => {
    let {labelSuffix = 0} = options;
    
    return {
        'if (__a === __b) return __c; else return __d': (vars, path) => {
            const label = createName(path);
            
            return `{
                cmp(__a, __b);
                jnz(${label});
                return __c;
                ${label}:
                return __d;
            }`;
        },
        'if (__a === __b) __c': (vars, path) => {
            const next = getNext(path);
            const name = createName(next);
            
            createLabel(next, name);
            
            return `{
                cmp(__a, __b);
                jnz(${name});
                __c;
            }`;
        },
        'if (__a === __b) {__body}': (vars, path) => {
            const name = createName(path);
            const next = getNext(path);
            
            createLabel(next, name);
            
            return `{
                cmp(__a, __b);
                jnz(${name});
                __body;
            }`;
        },
        'if (__a !== __b) __c': (vars, path) => {
            const next = getNext(path);
            const name = createName(next, ++labelSuffix);
            
            createLabel(next, name);
            
            return `{
                cmp(__a, __b);
                jz(${name});
                __c;
            }`;
        },
        'if (__a !== __b) {__body}': (vars, path) => {
            const next = getNext(path);
            const name = createName(next);
            
            createLabel(next, name);
            
            return `{
                cmp(__a, __b);
                jz(${name});
                __body;
            }`;
        },
        'if (__a === __b) __c; else __d': (vars, path) => {
            const next = getNext(path);
            const name = createName(next);
            
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

function getNext(path) {
    const next = path.getNextSibling();
    
    if (next.node)
        return next;
    
    if (path.parentPath.isLabeledStatement())
        path = path.parentPath;
    
    insertAfter(path, callExpression(identifier('nop'), []));
    
    return path.getNextSibling();
}
