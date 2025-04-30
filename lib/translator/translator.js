import createWabt from 'wabt';

export const translate = async (name, wast) => {
    if (!wast) {
        wast = name;
        name = 'ishvara.wast';
    }
    
    const wabt = await createWabt();
    const parsedWat = wabt.parseWat(name, wast);
    
    const {buffer} = parsedWat.toBinary({
        log: false,
    });
    
    return buffer;
};
