import {test} from 'supertape';
import montag from 'montag';
import {print} from './printer.js';

test('ishvara: printer-wasm', (t) => {
    const source = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call(log);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-wasm: import', (t) => {
    const source = montag`
        __ishvara_wasm_import('console', 'log', function log(i32) {});
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call(log);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (import "console" "log" (func $log (param i32)))
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-wasm: import: couple args', (t) => {
    const source = montag`
        __ishvara_wasm_import('console', 'log', function log(name: i32, message: f64) {return i32});
        
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call(log);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (import "console" "log" (func $log (param $name i32) (param $message f64) (result i32)))
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-wasm: import: no return', (t) => {
    const source = montag`
         __ishvara_wasm_import('console', 'log', function warn() {
             i32;
         });
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (import "console" "log" (func $warn (result i32)))
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-wasm: comments', (t) => {
    const source = montag`
        // example/1.wast.ts
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call(log);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-wasm: function: no export', (t) => {
    const source = montag`
        function add(): i32 {
            local(eax, i32);
            local(ebx, i32);
            local.set(eax, i32.const(1));
            local.set(ebx, i32.const(2));
            i32.add(local.get(eax), local.get(ebx));
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $add (result i32)
                (local $eax i32)
                (local $ebx i32)
                (local.set $eax (i32.const 1))
                (local.set $ebx (i32.const 2))
                (i32.add (local.get $eax) (local.get $ebx))
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-wasm: data', (t) => {
    const source = montag`
        data(i32.const(0), "Hello World");
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (data (i32.const 0) "Hello World")
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-wasm: memory', (t) => {
    const source = montag`
        __ishvara_wasm_memory(1);
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (memory 1)
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-wasm: memory: export', (t) => {
    const source = montag`
        __ishvara_wasm_memory("memory", 1);
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (memory (export "memory") 1)
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-wasm: return', (t) => {
    const source = montag`
        export function thenElse(a: i32): i32 {
            return i32.const(1);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $thenElse (export "thenElse") (param $a i32) (result i32)
                (return (i32.const 1))
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-wasm: if', (t) => {
    const source = montag`
        export function thenElse(a: i32): i32 {
            if (i32.eq(local.get(a), i32.const(10)))
                return i32.const(1);
            
            i32.const(0);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $thenElse (export "thenElse") (param $a i32) (result i32)
                (if
                    (i32.eq (local.get $a) (i32.const 10))
                    (then
                        (return (i32.const 1))
                    )
                )
                (i32.const 0)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});
