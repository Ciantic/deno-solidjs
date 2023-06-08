import * as esbuild from "npm:esbuild";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.1/mod.ts";
import { solidPlugin } from "npm:esbuild-plugin-solid";


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

    const plugins: any[] = [...denoPlugins({})];

    const result = await esbuild.build({
        entryPoints: [file],
        // outfile: compileOutput,
        outfile: bundleOutput,
        // Bundle relative imports
        bundle: true,
        format: "esm",
        // Need to mark every bare import as external
        // external: ['solid-js', 'solid-js/web', 'npm:solid-js/web', 'npm:solid-js'],
        // Tree-shaking is done below
        treeShaking: true,
        minify: true,
        // Compile SolidJS JSX

        plugins: [ 
            plugins[0],
            solidPlugin({
                solid: {
                    moduleName: 'npm:solid-js/web',
                },
            }) as any,
            plugins[1]
        ], 
    });

	console.log(result.errors);
    // esbuild.stop();
}

// Get first argument
const file = Deno.args[0];
const outFile = Deno.args[1];

await buildTsFile(file, outFile); 