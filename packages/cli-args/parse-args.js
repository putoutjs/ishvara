import parser from 'yargs-parser';

export const parseArgs = (argv) => {
    const args = parser(argv, {
        string: ['target', 'output'],
        alias: {
            target: 't',
            output: 'o',
        },
    });
    
    return args;
};
