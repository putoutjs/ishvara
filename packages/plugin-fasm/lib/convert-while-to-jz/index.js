import {
    template,
    types,
    operator,
    print,
} from 'putout';

const {compare, extract} = operator;

const {
    identifier,
    expressionStatement,
    isCallExpression,
    labeledStatement,
    isBooleanLiteral,
    isArrayExpression,
    blockStatement,
} = types;

const createStartLabel = (line) => `__ishvara_do_while_${line}`;
const createConditionLabel = (line) => `__ishvara_do_while_condition_${line}`;

export const report = () => `Use 'jz' instead of 'while'`;

export const replace = () => ({
    'while(__a) {__body}': ({__a, __body}, path) => {
        const {line} = path.node.loc.start;
        const startLabel = createStartLabel(line);
        const conditionLabel = createConditionLabel(line);
        const [one, two, jnz, test] = parseWhileArgs(__a);
        
        let conditionExpression = createExpression(__a, {
            one,
            two,
            test,
        });
        
        const wasContinue = maybeReplaceContinueWithJmp(path, conditionLabel);
        
        if (wasContinue)
            conditionExpression = labeledStatement(identifier(conditionLabel), conditionExpression);
        
        __body.body.push(conditionExpression);
        __body.body.push(expressionStatement(template.ast(`${jnz}(${startLabel})`)));
        
        return `${startLabel}: __body`;
    },
});

const parseWhileArgs = (__a) => {
    if (isBooleanLiteral(__a) && __a.value)
        return [
            'al',
            'al',
            'je',
            'cmp',
        ];
    
    if (isBooleanLiteral(__a) && !__a.value)
        return [
            'al',
            'al',
            'jne',
            'cmp',
        ];
    
    if (isArrayExpression(__a))
        return [
            'al',
            'al',
            'jnz',
            'test',
        ];
    
    if (compare(__a, '__a === __b'))
        return [
            extract(__a.left),
            extract(__a.right),
            'jz',
            'test',
        ];
    
    return [
        __a.name,
        __a.name,
        'jz',
        'test',
    ];
};

function createExpression(__a, {one, two, test}) {
    if (isCallExpression(__a))
        return expressionStatement(__a);
    
    if (isArrayExpression(__a)) {
        const source = print(__a).slice(0, -2);
        return blockStatement([
            expressionStatement(template.ast(`mov(al, ${source})`)),
            expressionStatement(template.ast(`${test}(al, al)`)),
        ]);
    }
    
    return expressionStatement(template.ast(`${test}(${one}, ${two})`));
}

function maybeReplaceContinueWithJmp(path, startLabel) {
    let was = false;
    
    path.traverse({
        ContinueStatement(path) {
            path.replaceWithSourceString(`jmp(${startLabel})`);
            was = true;
        },
    });
    return was;
}
