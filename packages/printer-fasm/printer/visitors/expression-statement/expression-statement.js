import {isJmpFar, printJmpFar} from './print-jmp-far.js';

export const ExpressionStatement = (path, printer) => {
    const {
        print,
        indent,
        traverse,
    } = printer;
    
    const expression = path.get('expression');
    
    if (isJmpFar(expression)) {
        printJmpFar(expression, printer);
        print.breakline();
        
        return;
    }
    
    indent();
    traverse(expression);
    print.newline();
};
