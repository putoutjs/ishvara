import {types} from 'putout';

const {
    identifier,
    TSTypeReference,
    TSTypeAnnotation,
} = types;

const createType = () => TSTypeAnnotation(TSTypeReference(identifier('i32')));

export const report = () => `Apply types`;

export const replace = () => ({
    'function __a(__args) {__body}': (vars, path) => {
        for (const param of path.get('params')) {
            const typeAnnotation = createType();
            param.node.typeAnnotation = typeAnnotation;
        }
        
        path.node.returnType = createType();
        
        return path;
    },
    'return __': '__',
    '__a + __b': 'i32.add(local.get(__a), local.get(__b))',
});
