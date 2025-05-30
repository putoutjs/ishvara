import {readFile} from 'node:fs/promises';

export const readSourceLine = async (name, line, {readSourceFile = readFile} = {}) => {
    const source = await readSourceFile(name, 'utf8');
    const lines = source.split('\n');
    const result = lines[line - 1].trim();
    
    return result;
};
