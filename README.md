# Ishvara

![ishvara](https://github.com/putoutjs/ishvara/blob/master/images/ishvara.jpg)

Compile JavaScript to WASM.

## Install

```
npm i ishvara
```

## Example

```ts
import {create} from '#ishvara';

export const stack = [];

export const imports = [
    ['console', 'log', function log() {
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

export function x(a: i32, b: i32): i32 {
    i32.add(local.get(a), local.get(b));
    call('log');
}
```

Compiled to:

```wast
(module
    (func $x (export "x") (param $a i32) (param $b i32) (result i32)
        (i32.mul (local.get $a) (local.get $b))
    )
)
```

## License

MIT
