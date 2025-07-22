export const report = () => `Avoid useless import of '@ishvara/operator-nemesis'`;

export const replace = () => ({
    'import __imports from "@ishvara/operator-nemesis"': '',
});
