// example/1.wast.ts
import {create} from '#operator-wasm';

export const stack = [];
export const imports = [
    ['console', 'log', function log(i322) {
        return i322;
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

export function x(a, b) {
    i32.add(local.get(a), local.get(b));
    call('log');
}
