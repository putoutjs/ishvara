export const report = () => `Use 'int(0xff)' instead of 'nemesis.findFile()'`;

export const replace = () => ({
    '__a = nemesis.findFile(__b)': `{
        al = 3;
        bx = __b;
        int(0xff);
        __a = ax;
    }`,
});
