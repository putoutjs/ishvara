import {template, types} from 'putout';

const {
    expressionStatement,
    isCallExpression,
} = types;

export const report = () => `Use 'jnz' instead of 'do-while'`;

export const replace = () => ({
    'do {__body} while (__a)': ({__a, __body}, path) => {
        const {line} = path.node.loc.start;
        const expression = isCallExpression(__a) ? __a : template.ast(`test(${__a.name}, ${__a.name})`);
        
        __body.body.push(expressionStatement(expression));
        __body.body.push(expressionStatement(template.ast(`jnz(__ishvara_do_while_${line})`)));
        
        return `__ishvara_do_while_${line}: __body`;
    },
});
