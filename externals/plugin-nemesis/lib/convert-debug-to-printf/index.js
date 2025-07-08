import {types} from 'putout';

const {isIdentifier} = types;

export const report = () => `Use 'nemesis.printf()' instead of 'debug'`;

export const match = () => ({
    'debug(__a)': ({__a}) => isIdentifier(__a),
});

export const replace = () => ({
    'debug(__a)': 'nemesis.printf(__a)',
});
