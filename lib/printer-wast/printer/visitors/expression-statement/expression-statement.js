import {isNext} from '@putout/printer/is';
import {
    isWastImport,
    printWastImport,
} from './print-wast-import.js';

export const ExpressionStatement = (path, printer) => {
    const {
        print,
        indent,
        maybe,
    } = printer;
    
    const expression = path.get('expression');
    
    if (isWastImport(expression)) {
        printWastImport(expression, printer);
        maybe.print.breakline(isNext(path));
        
        return;
    }
    
    indent();
    print('__expression');
    print.newline();
};

