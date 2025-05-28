export const report = () => `Remove useless 'mov'`;

export const replace = () => ({
    'mov(__a, __a)': '',
});
