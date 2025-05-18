import parser from 'yargs-parser';

export const parseArgs = (argv) => {
    const args = parser(argv, {
        string: ['target', 'output'],
        boolean: ['help', 'version'],
        alias: {
            target: 't',
            output: 'o',
            help: 'h',
            version: 'v',
        },
    });
    
    return args;
};
