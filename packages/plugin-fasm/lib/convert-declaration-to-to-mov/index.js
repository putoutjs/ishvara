export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const replace = () => ({
    'const __a = __b': 'mov(__a, __b)',
});
