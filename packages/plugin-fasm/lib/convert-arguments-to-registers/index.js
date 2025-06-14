import {
    template,
    types,
    operator,
} from 'putout';

const {rename} = operator;
const {
    blockStatement,
    expressionStatement,
} = types;

const createExpression = (a) => {
    return expressionStatement(template.ast(a));
};

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const match = () => ({
    'async function __a(__b: __c) {__body}': ({__c}) => Boolean(__c),
});

export const replace = () => ({
    'async function __a(__b: __c) {__body}': ({__b, __c, __body}, path) => {
        const type = __c.typeName.name;
        delete __b.typeAnnotation;
        __body.body.unshift(blockStatement([
            createExpression('pop(bx)'),
            createExpression('pop(ax)'),
            createExpression('push(bx)'),
        ]));
        
        if (type === 'i8')
            rename(path, __b.name, 'al');
        else if (type === 'i16')
            rename(path, __b.name, 'ax');
        
        path.node.params = [];
        
        return path;
    },
});
