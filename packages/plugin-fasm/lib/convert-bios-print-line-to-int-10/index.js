export const report = () => `Use '0x10' instead of 'bios.printLine()'`;

export const replace = () => ({
    'bios.printLine()': `{
        ax = 0x1301;
        int(0x10);
    }`,
});
