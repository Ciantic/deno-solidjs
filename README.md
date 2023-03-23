
Bundle

```bash
deno run -A bundle-solidjs.ts "src/test.tsx" "dist/out.js"
```

Server, not really necessary but it's here

```bash
deno run --allow-net --allow-read https://deno.land/std@0.159.0/http/file_server.ts
```

## Notes

The versions of SolidJS must be the same. Always use an URL with a version number, or resort to using `import_map.json`. This might not be necessary when `npm:` specifier support lands to [esbuild_deno_loader](https://github.com/lucacasonato/esbuild_deno_loader/issues/29)