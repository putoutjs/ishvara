import {
    template,
    types,
    operator,
} from 'putout';

const {rename} = operator;
const {expressionStatement} = types;

const createExpression = (a) => {
    return expressionStatement(template.ast(a));
};

export const report = () => `Use 'regs' instead of 'args'`;

export const match = () => ({
    'async function __a(__args) {__body}': ({__args}) => __args.length,
});
export const replace = () => ({
    'async function __a(__args) {__body}': ({__body, __args}, path) => {
        const bytes = 2;
        const stackSize = bytes * __args.length;
        
        __body.body.unshift(...[
            createExpression('push(bp)'),
            createExpression('mov(bp, sp)'),
        ]);
        
        __body.body.push(...[
            createExpression('pop(bp)'),
            createExpression(`add(sp, ${stackSize})`),
        ]);
        
        for (const [i, arg] of __args.entries()) {
            const {name} = getType(arg);
            rename(path, arg.name, `bp + ${bytes * (i + 1)}`);
            path.__ishvara_type = name;
        }
        
        path.node.params = [];
        
        return path;
    },
});

function getType({typeAnnotation}) {
    if (!typeAnnotation)
        return 'i16';
    
    return typeAnnotation.typeAnnotation.typeName;
}
