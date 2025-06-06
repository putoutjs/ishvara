import {types} from 'putout';

const {
    expressionStatement,
    identifier,
    arrayExpression,
    callExpression,
    isExportNamedDeclaration,
} = types;

export const report = () => `Use 'label' instead of 'function'`;

export const filter = (path) => !isExportNamedDeclaration(path.parentPath);

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
    
    __body.body.push(expressionStatement(maybeRet(ret) || __b.typeName));
    
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
    __body.body.push(pop);
}

function createStackOperation(name, args) {
    const callee = identifier(name);
    const params = [
        arrayExpression(args),
    ];
    
    return expressionStatement(callExpression(callee, params));
}
