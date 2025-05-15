export const report = () => `Use '__ishvara_wasm_memory' instead of 'export const memory'`;

export const replace = () => ({
    'export const memory = [__a, __b]': '__ishvara_wasm_memory(__a, __b)',
});
