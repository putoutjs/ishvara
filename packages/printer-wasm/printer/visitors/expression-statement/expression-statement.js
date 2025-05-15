import {isNext, isPrev} from '@putout/printer/is';
import {
    isWastImport,
    printWastImport,
} from './print-wast-import.js';

export const ExpressionStatement = (path, printer) => {
    const {print, maybe} = printer;
    
    const expression = path.get('expression');
    
    if (isWastImport(expression)) {
        printWastImport(expression, printer);
        maybe.print.breakline(isNext(path));
        
        return;
    }
    
    const surrounded = isPrev(path) || isNext(path);
    
    maybe.indent(surrounded);
    print('__expression');
    maybe.print.newline(surrounded);
};
