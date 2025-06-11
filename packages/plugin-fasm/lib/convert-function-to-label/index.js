import {types} from 'putout';

const {
    isCallExpression,
    isReturnStatement,
    expressionStatement,
    identifier,
    arrayExpression,
    callExpression,
    isExportNamedDeclaration,
} = types;

export const report = () => `Use 'label' instead of 'function'`;

export const filter = (path) => {
    if (isExportNamedDeclaration(path.parentPath))
        return false;
    
    const last = path.node.body.body.at(-1);
    
    return !(isCallExpression(last) && last.callee.name === 'ret');
};

export const replace = () => ({
    'async function __a<__type_params>(__args): __b {__body}': convertFnToLabel(),
    'function __a<__type_params>(__args): __b {__body}': convertFnToLabel(),
    'function __a(__args): __b {__body}': convertFnToLabel(),
    'async function __a(__args): __b {__body}': convertFnToLabel(),
    'async function __a<__type_params>(__args) {__body}': convertFnToLabel('ret'),
    'function __a<__type_params>(__args) {__body}': convertFnToLabel('ret'),
    'function __a(__args) {__body}': convertFnToLabel('ret'),
    'async function __a(__args) {__body}': convertFnToLabel('ret'),
});

const convertFnToLabel = (ret) => ({__b, __type_params, __body}) => {
    addStackOperations({
        __type_params,
        __body,
    });
    
    const iret = expressionStatement(maybeRet(ret) || callExpression(__b.typeName, []));
    __body.body.push(iret);
    
    return '__a: __body';
};

const maybeRet = (name) => name && callExpression(identifier(name), []);

function addStackOperations({__body, __type_params = []}) {
    const args = [];
    
    for (const {name} of __type_params) {
        args.push(name);
    }
    
    if (!args.length)
        return;
    
    const push = createStackOperation('push', args);
    
    const pop = createStackOperation('pop', args
        .slice()
        .reverse());
    
    __body.body.unshift(push);
    
    const last = __body.body.at(-1);
    
    if (isReturnStatement(last))
        __body.body.splice(-1, 1, pop, last);
    else
        __body.body.push(pop);
}

function createStackOperation(name, args) {
    const callee = identifier(name);
    const params = [
        arrayExpression(args),
    ];
    
    return expressionStatement(callExpression(callee, params));
}
