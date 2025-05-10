export const LabeledStatement = (path, {print}) => {
    print('__label');
    print(':');
    print.space();
    print('__body');
};
