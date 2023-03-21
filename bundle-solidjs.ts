import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader/mod.ts";
import { solidPlugin } from "https://esm.sh/esbuild-plugin-solid";

// Deno plugin does not work with npm specifier yet:
// https://github.com/lucacasonato/esbuild_deno_loader/issues/29
//
// When it does:
// 1. Add external option ['npm:solid-js/web', 'npm:solid-js']
// 2. Change solidPlugin's moduleName to 'npm:solid-js/web'
// 3. In source code use also `npm:solid-js/web` instead of URL

async function buildTsFile(file: string, outFile: string) {
    if (!file) {
        console.error("Please provide a file to bundle.");
        return false;
    }

    if (!outFile) {
        console.error("Please provide an output file.");
        return false;
    }

    if (!file.endsWith(".ts") && !file.endsWith(".tsx")) {
        console.error("Please provide a .ts file to bundle.");
        console.error("Given file: ", file);
        return false;
    }

    if (!outFile.endsWith(".js")) {
        console.error("Please provide a .js output file.");
        console.error("Given file: ", outFile);
        return false;
    }

    // Replace extension with "compile.js"
    const compileOutput = outFile.replace(/\.js$/, ".compile.js");
    const bundleOutput = outFile;

    await esbuild.build({
        entryPoints: [file],
        outfile: compileOutput,
        // outfile: bundleOutput,
        // Bundle relative imports
        bundle: true,
        format: "esm",
        // Need to mark every bare import as external
        // external: ['solid-js', 'solid-js/web', 'npm:solid-js/web', 'npm:solid-js'],
        // Tree-shaking is done below
        treeShaking: false,
        // Compile SolidJS JSX

        plugins: [
            solidPlugin({
                solid: {
                    // moduleName: 'npm:solid-js/web',
                    moduleName: "https://esm.sh/solid-js@1.6.15/web?target=esnext",
                },
            }) as any,
        ], 
    });

    const result = await esbuild.build({
        entryPoints: [compileOutput],
        outfile: bundleOutput,
        bundle: true,
        treeShaking: true,
        plugins: [denoPlugin({}) as any],
    });

	console.log(result.errors);

    esbuild.stop();
}

// Get first argument
const file = Deno.args[0];
const outFile = Deno.args[1];

await buildTsFile(file, outFile);