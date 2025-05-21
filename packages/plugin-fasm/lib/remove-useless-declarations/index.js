export const report = () => `Avoid useless import of '#operator-fasm'`;

export const replace = () => ({
    'import __imports from "#operator-fasm"': '',
    'export {__exports}': '',
});
