import {types} from '@putout/babel';
import {
    isPrevBody,
    noTrailingComment,
    isLast,
} from '@putout/printer/is';

const {isJSXElement} = types;
const isBodyLength = ({parentPath}) => parentPath.node?.body?.length > 2;

const isInsideIfWithElse = ({parentPath}) => parentPath.isIfStatement() && parentPath.node.alternate;

export const ReturnStatement = (path, printer, semantics) => {
    const {indent, print} = printer;
    
    indent();
    print('(');
    print('return');
    print.space();
    
    print('__argument');
    print(')');
    print.newline();
};
