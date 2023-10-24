# CSS Bundling

To get started, ensure you have a recent version of Nodejs (>= 18) installed run

```
npm install
```

from the `bundler/` directory (this directory).

Then run

```
npx vite build
```

to test your installation. If all worked well, you should have a `dist/default` directory that contains bundled CSS in a subdirectory.

## Usage

Environmental variables control what options `vite` uses to package the CSS.

-   `PTX_VERSION` a string that will be used to set the subdirectory into which bundled assets are written (defaults to `version` in `package.json`)
-   `PTX_MINIFY` a string `true` or `false` indicating whether to minify the CSS after it is bundled.
-   `PTX_STYLE` a string corresponding to the name of a subdirectory of `src` indicating which CSS to bundle. For example `PTX_STYLE=prism` will bundle the CSS for prismjs into `dist/prism`.

### Example

To create a version 1.7 minified bundle of `oscarlevin`, run

```
PTX_VERSION=1.7 PTX_MINIFY=true PTX_STYLE=oscarlevin npx vite build
```

In `dist/oscarlevin/1.7/styles` should now be the bundled CSS, along with any other required assets (e.g., fonts).

### Notes

The bundler by default will create an `index.html` and `index.js` file. These files are a byproduct of the build process and can be ignored.

## Development

Each directory in `src/` contains a different build target. The `index.ts` file contains a list of import statements for the CSS that will
be bundled. If you want to extend an existing bundle, you may import the existing bundle with `import "../<bundle name>";` (no circular references, please!).

To create a new target, copy an existing target and modify its `index.ts`. You can then set `PTX_STYLE=<new target name>` to build the new target.

### Notes

Some assets are imported from `"../node_modules/..."`. These assets have been installed via the `npm install` command. If you find
additional assets that are needed, you can run `npm install <asset name>`.
