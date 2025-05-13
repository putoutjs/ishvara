import {exists} from '@putout/printer/is';

export const LabeledStatement = (path, {print, maybe}) => {
    const prev = path.getPrevSibling();
    maybe.print.breakline(exists(prev));
    
    print('__label');
    print(':');
    print.breakline();
    print('__body');
};
