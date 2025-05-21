import {types, operator} from 'putout';

const {replaceWith} = operator;
const {
    labeledStatement,
    identifier,
} = types;

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const replace = () => ({
    'if (__a) return __b': (vars, path) => {
        const label = createLabel(path);
        
        return `{
            __a;
            jnz(${label});
            return __b;
        }`;
    },
    '__a === __b': 'cmp(__a, __b)',
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
