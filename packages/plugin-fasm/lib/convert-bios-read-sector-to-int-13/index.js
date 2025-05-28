export const report = () => `Use '0x13' instead of 'bios.readSector()'`;

export const match = () => ({
    'bios.readSector()': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    'bios.readSector()': (vars, path) => {
        const {line} = path.node.loc.start;
        
        return `{
            ah = 2;
            int(0x13);
            jnc(__ishvara_read_sector_ok_${line});
            al = 1;
            clc();
            __ishvara_read_sector_ok_${line}:
            ax = 0
        }`;
    },
});
