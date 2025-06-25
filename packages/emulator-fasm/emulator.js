import * as fasm from 'fasm.js';

export const run = async (binary) => {
    return await fasm.run(binary);
};
