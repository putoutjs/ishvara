export const report = () => `Use 'eax' instead of 'return'`;

export const replace = () => ({
    'return __': 'eax = __',
});
