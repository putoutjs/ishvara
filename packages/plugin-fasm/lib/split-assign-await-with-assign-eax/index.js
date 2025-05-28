export const report = () => `Get result from 'eax'`;

export const replace = () => ({
    '__a = await __b(__args)': ({__a}) => {
        const eax = __a.name.startsWith('e') ? 'eax' : 'ax';
        
        return `{
            await __b(__args);
            __a = ${eax};
        }`;
    },
});
