/** @jsxImportSource npm:solid-js */
/// <reference lib="dom" />

// Deno plugin does not work with npm specifier yet:
// https://github.com/lucacasonato/esbuild_deno_loader/issues/29
// import { render } from "npm:solid-js/web";


// @deno-types="npm:solid-js/web"
import { render } from "https://esm.sh/solid-js@1.6.15/web?target=esnext";

// @deno-types="npm:solid-js"
import { createSignal } from "https://esm.sh/solid-js@1.6.15?target=esnext";


function Bar() {
    const [value, setValue] = createSignal(0);
    setInterval(() => {
        setValue(value() + 1)
    }, 1000);
    return <div>Incremented value {value()}</div>;
}

render(() => <Bar />, document.getElementById("root") as any);