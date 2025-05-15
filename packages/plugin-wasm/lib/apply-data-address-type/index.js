import {template} from 'putout';
import {types} from 'putout';

const {isNumericLiteral} = types;
export const report = () => `Apply data address type`;

export const match = () => ({
    'export const data = __array': ({__array}, path) => {
        for (const element of __array.elements) {
            const [first] = element.elements;
            
            if (isNumericLiteral(first))
                return true;
        }
        
        return false;
    },
});

export const replace = () => ({
    'export const data = __array': ({__array}, path) => {
        for (const element of __array.elements) {
            const [first] = element.elements;
            
            if (!isNumericLiteral(first))
                continue;
            
            element.elements[0] = template.ast(`i32.const(${first.value})`);
        }
        
        return path;
    },
});
