export const report = () => `Use 'xor' instead of 'mov'`;

export const replace = () => ({
    'mov(eax, 0)': 'xor(eax, eax)',
    'mov(eax, 1)': `{
    	xor(eax, eax);
        inc(eax);
    }`,
});
