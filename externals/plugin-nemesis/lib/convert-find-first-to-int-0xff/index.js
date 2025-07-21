const FIND_FIRST = 5;

export const report = () => `Use '0xff' instead of 'nemesis.readSector()'`;

export const match = () => ({
    'nemesis.findFirst(__a)': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    '__a = nemesis.findFirst(__b)': `{
        al = ${FIND_FIRST};
        bx = __b;
        int(0xff);
        __a = ax;
    }`,
    'nemesis.findFirst(__a)': `{
        al = ${FIND_FIRST};
        bx = __a;
        int(0xff);
    }`,
    'nemesis.findFirst()': `{
        al = ${FIND_FIRST};
        int(0xff);
    }`,
});
