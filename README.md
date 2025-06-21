# Ishvara

![ishvara](https://github.com/putoutjs/ishvara/blob/master/images/ishvara.jpg)

Compile JavaScript to WASM and Fasm.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/e3808fa0-90cc-4e9f-acb3-68babafa0350" />


## Install

```
npm i ishvara -g
```

## Usage Example

Let's suppose you have JavaScript:

```js
function add() {
    const eax = 1;
    const ebx = 2;
    
    return eax + ebx;
}
```

You can compile it to fasm to wasm.

### Fasm

Let's compile javascript with:

```sh
ishvara --target fasm example/fn.ts -o code
```

To intermediate representation:

```js
__ishvara_add: {
    mov(eax, 0x1);
    mov(ebx, 0x2);
    add(eax, ebx);
    ret;
}
```

Also we can compile it with:

```sh
ishvara -t fasm example/fn.ts -o code
```

to assembly representation with:

```asm
__ishvara_add:
mov eax, 0x1
mov ebx, 0x2
add eax, ebx
ret
```

Also we can compile it to binary representation with `ishvara fasm example/fn.ts`:

```sh
$ hexdump example/fn.bin

0000000 b866 0001 0000 bb66 0002 0000 0166 c3d8
0000010
```

## Example

Let's suppose we have absolutely valid JavaScript file with types, which we can run with node v24.

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
