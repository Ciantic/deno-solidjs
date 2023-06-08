/** @jsxImportSource npm:solid-js */
/// <reference lib="dom" />

// @deno-types="npm:solid-js/web"
import { render } from "npm:solid-js/web";

// @deno-types="npm:solid-js"
import { createSignal } from "npm:solid-js";


function Bar() {
    const [value, setValue] = createSignal(0);
    setInterval(() => {
        setValue(value() + 1)
    }, 1000);
    return <div>Incremented value {value()}</div>;
}

render(() => <Bar />, document.getElementById("root") as any);