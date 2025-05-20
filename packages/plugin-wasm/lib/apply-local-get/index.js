import {template} from 'putout';
import {types} from 'putout';
import {operator} from 'putout';

const {getTemplateValues} = operator;
const {replaceWith} = operator;
const {isIdentifier} = types;
const i32 = 'i32.__(__a, __b)';

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const fix = (path) => {
    const [first, second] = path.get('arguments');
    
    if (isIdentifier(first)) {
        const localGet = template.ast(`local.get(${first.node.name})`);
        replaceWith(first, localGet);
        return;
    }
    
    const localGet = template.ast(`local.get(${second.node.name})`);
    replaceWith(second, localGet);
};

export const traverse = ({push}) => ({
    [i32]: (path) => {
        const {__a, __b} = getTemplateValues(path, i32);
        
        if (!isIdentifier(__a) && !isIdentifier(__b))
            return;
        
        push(path);
    },
});
