import {
    template,
    types,
    operator,
} from 'putout';

const {replaceWith} = operator;
const {isCallExpression} = types;
const createCall = template(`i32.const(VALUE)`);

export const report = () => `Use 'i32.const()'`;

export const include = () => [
    'NumericLiteral',
];

export const exclude = () => [
    'i32.const(__a)',
    '__ishvara_wasm_memory(__args)',
];

export const fix = (path) => {
    replaceWith(path, createCall({
        VALUE: path.node,
    }));
};
