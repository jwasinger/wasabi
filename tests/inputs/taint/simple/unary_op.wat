(module
    (import "imports" "output" (func $print (param i32)))

    (func $source (param i32))
    (export "taint_source" (func $source))
    (func $sink (param i32))
    (export "taint_sink" (func $sink))

    (func $f (local $locA i32) (local $locB i32)
        i32.const 5
        set_local $locA

        ;; mark locA as tainted
        get_local $locA
        call $source

        ;; unary operation involving tainted locA
        get_local $locA
        i32.eqz

        ;; pass result to sink
        call $sink
    )

    (start $f)
)