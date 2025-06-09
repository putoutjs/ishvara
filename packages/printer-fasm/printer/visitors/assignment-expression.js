import {visitors} from '@putout/printer';
import {types} from '@putout/babel';

const {isMemberExpression} = types;

export const AssignmentExpression = (path, printer, semantics) => {
    const left = path.get('left');
    const right = path.get('right');
    
    if (!isMemberExpression(left) || !left.node.computed)
        return visitors.MemberExpression(path, printer, semantics);
    
    const {write, traverse} = printer;
    const object = path.get('left.object');
    const property = path.get('left.property');
    
    write('mov ');
    write('[');
    traverse(object);
    write(':');
    traverse(property);
    write(']');
    write(',');
    write.space();
    traverse(right);
};
