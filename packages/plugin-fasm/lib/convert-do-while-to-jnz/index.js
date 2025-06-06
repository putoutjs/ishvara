import {
    template,
    types,
    operator,
} from 'putout';

const {insertAfter, replaceWith} = operator;
const {
    identifier,
    expressionStatement,
    isCallExpression,
    labeledStatement,
} = types;

export const report = () => `Use 'jnz' instead of 'do-while'`;

export const match = () => ({
    'do {__body} while (--__a)': ({__a}) => {
        return /^(e?cx|cl)$/.test(__a.name);
    },
});

export const replace = () => ({
    'do {__body} while (--__a)': ({__body}, path) => {
        const {line} = path.node.loc.start;
        const loopExpression = template.ast(`loop(__ishvara_do_while_${line})`);
        
        __body.body.push(expressionStatement(loopExpression));
        
        maybeReplaceBreak(path, line);
        
        return `__ishvara_do_while_${line}: __body`;
    },
    'do {__body} while (!__a)': ({__a, __body}, path) => {
        const {line} = path.node.loc.start;
        const expression = isCallExpression(__a) ? __a : template.ast(`test(${__a.name}, ${__a.name})`);
        
        __body.body.push(expressionStatement(expression));
        __body.body.push(expressionStatement(template.ast(`jz(__ishvara_do_while_${line})`)));
        
        return `__ishvara_do_while_${line}: __body`;
    },
    'do {__body} while (__a)': ({__a, __body}, path) => {
        const {line} = path.node.loc.start;
        const expression = isCallExpression(__a) ? __a : template.ast(`test(${__a.name}, ${__a.name})`);
        
        __body.body.push(expressionStatement(expression));
        __body.body.push(expressionStatement(template.ast(`jnz(__ishvara_do_while_${line})`)));
        
        return `__ishvara_do_while_${line}: __body`;
    },
});

function maybeReplaceBreak(path, line) {
    let wasBreak = false;
    const breakLabel = `ishvara_do_while_break_${line}`;
    
    path.traverse({
        BreakStatement(path) {
            wasBreak = true;
            path.replaceWithSourceString(`jmp(${breakLabel})`);
        },
    });
    
    if (wasBreak) {
        const nextPath = path.getNextSibling();
        const labeledNode = labeledStatement(identifier(breakLabel), nextPath.node || expressionStatement(template.ast('nop()')));
        
        if (nextPath.node)
            replaceWith(nextPath, labeledNode);
        else
            insertAfter(path, labeledNode);
    }
}
