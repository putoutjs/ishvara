export const ReturnStatement = (path, printer) => {
    const {indent, print} = printer;
    
    indent();
    print('(');
    print('return');
    print.space();
    
    print('__argument');
    print(')');
    print.newline();
};
