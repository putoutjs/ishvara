import {template} from 'putout';
import {types} from 'putout';

const {expressionStatement} = types;
export const report = () => `Use 'jz' instead of 'do-while'`;

export const replace = () => ({
    'do {__body} while (__a)': ({__a, __body}, path) => {
        const {line} = path.node.loc.start;
        
        __body.body.push(expressionStatement(__a));
        __body.body.push(expressionStatement(template.ast(`jz(__ishvara_do_while_${line})`)));
        
        return `__ishvara_do_while_${line}: __body`;
    },
});
