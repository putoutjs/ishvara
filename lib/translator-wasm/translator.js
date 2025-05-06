import createWabt from 'wabt';
import tryCatch from 'try-catch';

export const translate = async (name, wast, options = {}) => {
    const {target} = options;
    
    if (!wast) {
        wast = name;
        name = 'ishvara.wast';
    }
    
    const {parseWat} = await createWabt();
    const [error, parsedWat] = tryCatch(parseWat, name, wast);
    
    if (error)
        return [null, toPlaces(name, error)];
    
    const {log, buffer} = parsedWat.toBinary({
        log: target === 'dump',
    });
    
    return [
        log || buffer,
        [],
    ];
};

function toPlaces(name, error) {
    const first = error.message.split('\n')[1];
    
    const list = first
        .replace(`${name}�`, '')
        .split(':');
    
    list.shift();
    
    const [line, column] = list;
    
    list.shift();
    list.shift();
    list.shift();
    
    const messageRaw = list
        .join(':')
        .slice(1);
    
    const message = messageRaw[0].toUpperCase() + messageRaw.slice(1);
    
    return [{
        message,
        position: {
            line: Number(line),
            column: Number(column),
        },
    }];
}
