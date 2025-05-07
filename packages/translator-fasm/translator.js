import * as fasm from 'fasm.js';
import hexdump from 'hexdump-nodejs';

export const translate = async (source, options = {}) => {
    const {type} = options;
    const [binary, places] = await fasm.translate(source);
    
    if (places)
        return [binary, places];
    
    if (type === 'dump')
        return [
            hexdump(binary),
            [],
        ];
};
