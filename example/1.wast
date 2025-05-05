(module
    (import "console" "log" (func $log  (result )))
    (func $x (export "x") (param $a i32) (param $b i32) (result i32)
        (i32.add (local.get $a) (local.get $b))
        (call $log)
    )
)
