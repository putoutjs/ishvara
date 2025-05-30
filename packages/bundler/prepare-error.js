import {readSourceLine} from './read-source-line.js';

const {assign} = Object;

export const prepareError = async (error) => {
    const {location, fileName} = error;
    const line = location.start.line + 1;
    const sourceLine = await readSourceLine(fileName, line);
    
    const message = error.message.replace('.', `: '${sourceLine}'`);
    
    return assign(error, {
        message,
    });
};
