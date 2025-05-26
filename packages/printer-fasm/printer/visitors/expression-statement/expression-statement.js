import {isNext} from '@putout/printer/is';
import {isJmpFar, printJmpFar} from './print-jmp-far.js';

export const ExpressionStatement = (path, printer) => {
    const {
        maybe,
        print,
        indent,
        traverse,
    } = printer;
    
    const expression = path.get('expression');
    
    if (isJmpFar(expression)) {
        printJmpFar(expression, printer);
        maybe.print.breakline(isNext(path));
        
        return;
    }
    
    indent();
    traverse(expression);
    print.newline();
};
