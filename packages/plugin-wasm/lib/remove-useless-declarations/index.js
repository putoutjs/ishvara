export const report = () => `Avoid useless declarations`;

export const replace = () => ({
    'import __imports from "#operator-wasm"': '',
    'export const stack = []': '',
    'const __a = create(__b)': '',
});
