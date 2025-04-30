export const report = () => `Avoid useless declarations`;

export const replace = () => ({
    'import __imports from "#operator-wast"': '',
    'export const stack = []': '',
    'const __a = create(__b)': '',
});
