import {types, operator} from 'putout';

const {replaceWith} = operator;
const {
    labeledStatement,
    identifier,
} = types;

export const report = () => `Use 'jmp' instead of 'if'`;

export const replace = () => ({
    'if (__a === __b) return __c; else return __d': (vars, path) => {
        const {loc} = path.node;
        const label = `__ishvara_fasm_if_${loc.start.line}`;
        
        return `{
            cmp(__a, __b);
            jnz(${label});
            return __c;
            ${label}:
            return __d;
        }`;
    },
    'if (__a === __b) return __c': (vars, path) => {
        const label = createLabel(path);
        
        return `{
            cmp(__a, __b);
            jnz(${label});
            return __c;
        }`;
    },
    'if (__a !== __b) return __c': (vars, path) => {
        const label = createLabel(path);
        
        return `{
            cmp(__a, __b);
            jz(${label});
            return __c;
        }`;
    },
});

function createLabel(path) {
    const next = path.getNextSibling();
    const {loc} = next.node;
    
    const name = `__ishvara_fasm_if_${loc.start.line}`;
    const labelName = identifier(name);
    const label = labeledStatement(labelName, next.node);
    
    replaceWith(next, label);
    
    return name;
}
