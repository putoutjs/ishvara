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

Compiled with `ishvara 1.wast.ts` to `1.wast`:

```wast
(module
    (import "console" "log" (func $log (param $message i32) (result i32)))
    (func $x (export "x") (param $a i32) (param $b i32) (result i32)
        (i32.add (local.get $a) (local.get $b))
        (call $log)
    )
)
```

With:

```js
import {compile} from 'ishvara';

const wast = compile(wastts);
const binary = await translate(wast);

const {x} = run(binary, {
    console: {
        log: (a) => {
            console.log(a);
            return a;
        },
    },
});

x(1, 2);
// outputs
3;
```

## License

MIT
