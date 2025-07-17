import {types, operator} from 'putout';

const {
    callExpression,
    labeledStatement,
    identifier,
    isLabeledStatement,
    isBinaryExpression,
    isArrayExpression,
} = types;

const {
    replaceWith,
    insertAfter,
    extract,
} = operator;

const createName = (suffix, type) => {
    return `__ishvara_fasm_if_${type}_${suffix}`;
};

export const report = () => `Use 'jmp' instead of 'if'`;
export const match = () => ({
    'if (__a) __b': ({__a}) => isBinaryExpression(__a),
    'if (__a) __b; else __c': ({__a}) => isBinaryExpression(__a),
});

export const replace = ({options}) => {
    let {labelSuffix = 0} = options;
    
    return {
        'if (__a) __b': (vars, path) => {
            const next = getNext(path);
            const name = createName(++labelSuffix, 'end');
            const [first, second, jnz] = parseTest(path);
            
            createLabel(next, name);
            
            return `{
                cmp(${first}, ${second});
                ${jnz}(${name});
                __b;
            }`;
        },
        'if (__a) __b; else __c': (vars, path) => {
            const next = getNext(path);
            const suffix = ++labelSuffix;
            const endLabel = createName(suffix, 'end');
            const elseLabel = createName(suffix, 'else');
            const [first, second, jnz] = parseTest(path);
            
            createLabel(next, endLabel);
            
            return `{
                cmp(${first}, ${second});
                ${jnz}(${elseLabel});
                __b;
                jmp(${endLabel});
                ${elseLabel}:
                __c;
            }`;
        },
    };
};

function parseOperator(operator) {
    if (operator === '===')
        return 'jnz';
    
    if (operator === '!==')
        return 'jz';
    
    if (operator === '>')
        return 'jle';
    
    if (operator === '<')
        return 'jge';
    
    throw Error(`☝️Looks like operator '${operator}' not supported`);
}

const maybeBraces = (node, value) => {
    if (isArrayExpression(node))
        return `[${value}]`;
    
    return value;
};

function parseTest(path) {
    const {
        left,
        right,
        operator,
    } = path.node.test;
    
    const extractedLeft = extract(left);
    const extractedRight = extract(right);
    
    return [
        maybeBraces(left, extractedLeft),
        maybeBraces(right, extractedRight),
        parseOperator(operator),
    ];
}

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
