import {
    template,
    types,
    operator,
} from 'putout';
import toSnakeCase from 'just-snake-case';

const {remove} = operator;
const {
    isStringLiteral,
    isLabeledStatement,
} = types;

const maybeCutDash = (a) => a.endsWith('_') ? a.slice(0, -1) : a;
const prepare = (__a) => maybeCutDash(toSnakeCase(__a.value));

export const report = () => `Apply 'debug()'`;

export const match = () => ({
    'debug(__a)': ({__a}) => isStringLiteral(__a),
});

export const replace = ({options}) => {
    let {counter = 0} = options;
    
    return {
        'debug(__a)': ({__a}, path) => {
            const {parentPath} = path;
            const parentParentPath = parentPath.parentPath;
            
            if (!options.debug) {
                if (isLabeledStatement(parentParentPath)) {
                    const next = parentParentPath.getNextSibling();
                    
                    parentParentPath.node.body = next.node;
                    remove(next);
                }
                
                return '';
            }
            
            const {variables} = options;
            const name = `__debug_${++counter}_` + prepare(__a);
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
