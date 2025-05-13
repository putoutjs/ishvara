export const report = () => `Use 'local' instead of 'const'`;

export const match = () => ({
    'const __a = __b': (vars, path) => !path.parentPath.isExportDeclaration(),
});
export const replace = () => ({
    'const __a = __b': `{
        local(__a, i32)
        local.set(eax, i32.const(__b))
    }`,
});
