import {types, operator} from 'putout';

const {replaceWith, insertAfter} = operator;

const {
    labeledStatement,
    identifier,
    returnStatement,
} = types;

const getStart = (path) => {
    const {loc} = path.node;
    
    if (loc)
        return loc.start;
    
    const prev = path.getPrevSibling();
    
    return prev.node.loc.start;
};

const createName = (path) => {
    const start = getStart(path);
    
    return `__ishvara_fasm_if_${start.line}`;
};

export const report = () => `Use 'jmp' instead of 'if'`;

export const replace = () => ({
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
        const name = createName(next);
        
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
});

function createLabel(path, name) {
    const labelName = identifier(name);
    const label = labeledStatement(labelName, path.node);
    
    replaceWith(path, label);
}

function getNext(path) {
    const next = path.getNextSibling();
    
    if (next.node)
        return next;
    
    insertAfter(path, returnStatement());
    return path.getNextSibling();
}
