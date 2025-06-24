import {
    template,
    types,
    operator,
} from 'putout';
import {is16bit} from '@ishvara/operator-fasm/regs';

const {
    replaceWithMultiple,
    rename,
} = operator;

const {
    expressionStatement,
    isReturnStatement,
} = types;

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
        const startCount = 2;
        
        __body.body.unshift(...[
            createExpression('push(bp)'),
            createExpression('mov(bp, sp)'),
        ]);
        
        const last = __body.body.at(-1);
        
        const popEBP = createExpression('pop(bp)');
        
        if (!isReturnStatement(last))
            __body.body.push(popEBP);
        
        const params = path.get('params');
        
        for (const [i, param] of params.entries()) {
            const arg = param.node;
            const {name} = getType(arg);
            
            rename(path, arg.name, `bp + ${bytes * (i + startCount)}`);
            param.__ishvara_type = name;
        }
        
        const argsSize = bytes * __args.length;
        
        path.__ishvara_args_size = argsSize;
        path.node.params = [];
        
        replaceReturn(path, argsSize);
        
        return path;
    },
});

function getType({typeAnnotation}) {
    if (!typeAnnotation)
        return 'i16';
    
    return typeAnnotation.typeAnnotation.typeName;
}

function replaceReturn(path, argsSize) {
    path.traverse({
        ReturnStatement(path) {
            const statements = [
                expressionStatement(template.ast('pop(bp)')),
                expressionStatement(template.ast(`ret(${argsSize})`)),
            ];
            
            const {argument} = path.node;
            
            if (argument) {
                const {name} = argument;
                
                if (is16bit(name))
                    statements.unshift(expressionStatement(template.ast(`mov(ax, ${name})`)));
            }
            
            replaceWithMultiple(path, statements);
        },
    });
}
