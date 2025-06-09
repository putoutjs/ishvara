import {readSourceLine} from './read-source-line.js';

const {assign} = Object;

export const prepareError = async (error) => {
    const {loc = {line: 0}, id} = error;
    const line = loc.line + 1;
    const sourceLine = await readSourceLine(id, line);
    const message = error.message.replace('.', `: '${sourceLine}'`);
    
    return assign(error, {
        message,
    });
};
