export const report = () => `Use hex index of dec`;

export const filter = (path) => {
    const {raw} = path.node;
    return !raw?.startsWith('0x');
};

export const fix = (path) => {
    const {value} = path.node;
    path.node.raw = '0x' + value.toString(16);
};

export const include = () => [
    'NumericLiteral',
];
