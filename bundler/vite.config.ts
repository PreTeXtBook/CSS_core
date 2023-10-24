import { defineConfig } from "vite";
import * as path from "node:path";
import * as fs from "node:fs";

import packageJson from "./package.json";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const VERSION = process.env.PTX_VERSION ?? packageJson.version;
const MINIFY = makeBoolean(process.env.PTX_MINIFY) ?? false;
let STYLE = process.env.PTX_STYLE ?? "default";

const root = path.join(__dirname, "src", STYLE);
const outDir = path.join(__dirname, "dist", STYLE, VERSION);

// If the root directory doesn't exist, throw an error.
if (!fs.existsSync(root)) {
    console.warn(
        `The directory ./src/${STYLE} does not exist. Make sure the PTX_STYLE variable is set to be the name of a subdirectory of ./src.`
    );
    process.exit(1);
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    root,
    base: "./",
    build: {
        outDir,
        cssMinify: MINIFY,
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: `[name]-${VERSION}.js`,
                chunkFileNames: `[name]-${VERSION}.js`,
                assetFileNames: `styles/[name].[ext]`,
            },
        },
    },
});

/**
 * Make the string `val` into a boolean.
 */
function makeBoolean(val: string | undefined): boolean | undefined {
    if (val === undefined) {
        return undefined;
    }
    const normalized = val.trim().toLowerCase();
    switch (normalized) {
        case "":
        case "n":
        case "no":
        case "false":
            return false;
    }
    return true;
}
