import {test} from 'supertape';
import montag from 'montag';
import {print} from './printer.js';

test('ishvara: printer-wasm', (t) => {
    const source = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call('log');
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

test('ishvara: convert-jasm-to-wast: import', (t) => {
    const source = montag`
        __ishvara_wast_import('console', 'log', function log(i32) {});
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call('log');
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

test('ishvara: convert-jasm-to-wast: import: couple args', (t) => {
    const source = montag`
        __ishvara_wast_import('console', 'log', function log(name: i32, message: f64) {return i32});
        
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call('log');
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

test('ishvara: convert-jasm-to-wast: import: no return', (t) => {
    const source = montag`
         __ishvara_wast_import('console', 'log', function warn() {
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
            call('log');
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

