import process from 'node:process';
import tryToCatch from 'try-to-catch';

export const validateArgs = async (args, {log, exit, stat}) => {
    if (!args._.length) {
        log('ishvara [options] [input]');
        return exit(1);
    }
    
    if (!args.target) {
        log(`'--target' is missing: 'wasm', 'fasm', 'asm', 'wast'`);
        return exit(1);
    }
    
    const [name] = args._;
    
    const [error] = await tryToCatch(stat, name);
    
    if (error)
        process.exit(1);
};
