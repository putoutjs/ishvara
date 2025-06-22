import {types, operator} from 'putout';

export const report = () => `Use '0xff' instead of 'nemesis.readSector()'`;

const {isArrayExpression} = types;
const {extract} = operator;

export const match = () => ({
    'nemesis.readSector()': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    '__a = nemesis.readSector(__object)': ({__object}, path) => {
        const {line} = path.node.loc.start;
        const {
            count = 1,
            buffer = 0,
            sector = 0,
            track = 0,
            disk = 0,
            head = 0,
        } = parseArgs(__object.properties);
        
        return `{
            ah = ${count};
            bx = ${buffer};
            cl = ${sector};
            ch = ${track};
            dl = ${disk};
            dh = ${head}; 
            ${createReadSector(line)}
            mov(__a, ax);
        }`;
    },
    '__a = nemesis.readSector()': (vars, path) => {
        const {line} = path.node.loc.start;
        
        return `{
            ${createReadSector(line)}
            mov(__a, ax);
        }`;
    },
    'nemesis.readSector()': (vars, path) => {
        const {line} = path.node.loc.start;
        return createReadSector(line);
    },
});

function createReadSector(line) {
    return `{
        al = 0xc;
        int(0x0ff);
        jnc(__ishvara_read_sector_ok_${line});
        al = 1;
        jmp(__ishvara_read_sector_end_${line});
        __ishvara_read_sector_ok_${line}:
        ax = 0
        __ishvara_read_sector_end_${line}:
        clc();
    }`;
}

function parseArgs(properties) {
    const result = {};
    
    for (const {key, value} of properties) {
        const extracted = extract(value);
        
        if (isArrayExpression(value)) {
            result[key.name] = `[${extracted}]`;
            continue;
        }
        
        result[key.name] = extracted;
    }
    
    return result;
}

