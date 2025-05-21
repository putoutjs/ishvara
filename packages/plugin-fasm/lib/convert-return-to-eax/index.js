export const report = () => `Use 'eax' instead of 'return'`;

export const replace = () => ({
    'return __a': `{
        eax = __a;
        ret();
    }`,
});
