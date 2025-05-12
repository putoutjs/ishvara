export const LabeledStatement = (path, {print}) => {
    print.breakline();
    print('__label');
    print(':');
    print.breakline();
    print('__body');
};
