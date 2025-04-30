import {create} from '#operator-wast';

export const stack = [];

export const imports = [
    ['console', 'log', function log(i32) {
        return i32;
    }],
];

const {
    i32,
    local,
    call,
} = create({
    stack,
    imports,
});
