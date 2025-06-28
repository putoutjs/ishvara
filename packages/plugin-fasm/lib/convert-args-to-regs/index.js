import {
    template,
    types,
    operator,
} from 'putout';
import {is16bit} from '@ishvara/operator-fasm/regs';

const {
    replaceWithMultiple,
    rename,
    compare,
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
    'async function __a(__args) {__body}': ({__args}, path) => {
        const {returnType} = path.node;
        
        if (returnType && returnType.typeAnnotation.typeName.name === 'ureg')
            return false;
        
        return __args.length;
    },
});

export const replace = () => ({
    'async function __a(__args) {__body}': ({__body, __args}, path) => {
        const bytes = getBytes(path);
        const startCount = 2;
        
        const ebp = getRegister(path, 'ebp');
        const esp = getRegister(path, 'esp');
        
        __body.body.unshift(...[
            createExpression(`push(${ebp})`),
            createExpression(`mov(${ebp}, ${esp})`),
        ]);
        
        const last = __body.body.at(-1);
        const popEBP = createExpression(`pop(${ebp})`);
        
        if (!isReturnStatement(last))
            if (compare(last, 'ret()'))
                __body.body.splice(-1, 0, popEBP);
            else
                __body.body.push(popEBP);
        
        const params = path.get('params');
        
        for (const [i, param] of params.entries()) {
            const arg = param.node;
            const {name} = getType(arg);
            
            rename(path, arg.name, `[${ebp} + ${bytes * (i + startCount)}]`);
            param.__ishvara_type = name;
        }
        
        const argsSize = bytes * __args.length;
        
        path.__ishvara_args_size = argsSize;
        path.node.params = [];
        
        replaceReturn(path, argsSize);
        
        delete path.node.returnType;
        return path;
    },
});

const REG = {
    i16: {
        ebp: 'bp',
        esp: 'sp',
    },
    i32: {
        ebp: 'ebp',
        esp: 'esp',
    },
    i64: {
        ebp: 'rbp',
        esp: 'rsp',
    },
};

const BYTES = {
    i16: 2,
    i32: 4,
    i64: 8,
};

function getBytes(path) {
    const {returnType} = path.node;
    
    if (!returnType)
        return 2;
    
    const {name} = path.node.returnType.typeAnnotation.typeName;
    
    return BYTES[name];
}

function getRegister(path, reg) {
    const {returnType} = path.node;
    
    if (!returnType)
        return REG.i16[reg];
    
    const {name} = path.node.returnType.typeAnnotation.typeName;
    
    return REG[name][reg];
}

function getType({typeAnnotation}) {
    if (!typeAnnotation)
        return 'i16';
    
    return typeAnnotation.typeAnnotation.typeName.name;
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
