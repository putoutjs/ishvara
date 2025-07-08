import {template, types} from 'putout';
import toCamelCase from 'just-camel-case';

const {isStringLiteral} = types;

export const report = () => `Apply 'debug()'`;

export const match = () => ({
    'debug(__a)': ({__a}) => isStringLiteral(__a),
});

export const replace = ({options}) => {
    let {counter = 0} = options;
    
    return {
        'debug(__a)': ({__a}, path) => {
            if (!options.debug)
                return '';
            
            const {variables} = options;
            const name = `__debug_${++counter}_` + toCamelCase(__a.value).replaceAll(/[^a-zA-Z\d]/g, '');
            const programPath = path.scope.getProgramParent().path;
            
            programPath.node.body.push(createVariable(__a, name));
            
            if (variables)
                variables.push(programPath.get('body').at(-1));
            
            return `debug(${name})`;
        },
    };
};
function createVariable(__a, name) {
    return template.ast(`let ${name} = ['${__a.value}', 0xd]`);
}
