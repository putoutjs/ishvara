export const report = () => `Use 'mov' instead of 'const'`;

export const replace = () => ({
    'const __a = __b': 'mov(__a, __b)',
});
