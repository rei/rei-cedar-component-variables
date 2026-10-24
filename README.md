cdr-component-variables
------------------

Component variables provide a versioned method for teams to import the exact CSS styles being used in the Cedar vue components and apply them to elements in their project. See the [Cedar docs](https://cedar.rei.com/components/component-variables/) for more high level information about component variables.

## Supported Components

See the [docs page](https://cedar.rei.com/components/component-variables) for a list of supported components and examples of how they can be used.
If there is a component that you would like to see supported, please [open an issue here](https://github.com/rei/rei-cedar-component-variables/issues).
If you are trying to build a component that is not in Cedar, you should instead use the [design tokens](https://github.com/rei/rei-cedar-tokens).

## Install

The component variables inherit values from the design tokens, so you will need to install both packages:

`pnpm add --save-dev @rei/cdr-tokens @rei/cdr-component-variables`

Your project must be able to compile SCSS or LESS in order to make use of this package.

This package contains `/dist/less` and `/dist/scss` folders, each of which contains `*.vars.{less|scss}` for each component, as well as an `index.{scss|less}` that imports all of those files. It is recommended that you use the `index` file to ensure that all variables are loaded in the correct order. A `dist/{scss|less}/cedar-component-variables.{scss|less}` file is also available which concatenates all of the variable files together.

## Usage

### CdrButton semantic contract preview

The CdrButton output is generated from the TypeScript contract in
`rei-cedar` PR #249, using `@rei/cdr-tokens@15.0.0-alpha.2`.
Load these runtime styles once in your application before using the button mixins:

```js
import '@rei/cdr-tokens/css';
import '@rei/cdr-tokens/css/color-action';
```

Then apply the generated mixins to your own HTML:

```scss
@use '@rei/cdr-component-variables/dist/scss/CdrButton.vars' as button;

.my-button {
  @include button.cdr-button-base-mixin;
  @include button.cdr-button-primary-mixin;
  @include button.cdr-button-large-mixin;
  @include button.cdr-button-full-width-mixin(xs);
}
```

```html
<button type="button" class="my-button">Continue</button>
```

All 28 previous public button mixins and 108 component hooks (`--cdr-button-*`)
remain available. New `--cdr-color-button-*` hooks take precedence over the old
component hooks. The old global design token names (`--cdr-color-background-button-*`,
`--cdr-color-text-button-*`, etc.) have been replaced by semantic tokens; migrate
those overrides to the new component hooks. Colors and keyboard focus behavior
follow PR #249, so this preview is an API-compatible Sass replacement with a
token/runtime migration, rather than a pixel-identical v11 stylesheet.

Supported variations: primary, secondary, dark, sale, link, icon-only and
with-background; four elevated color variants; small, medium and large;
left/right icons, large icon-only and full-width. Size and full-width mixins accept
an optional `xs`, `sm`, `md` or `lg` breakpoint. Apply base + color + size; apply
icon-only after the color and with-background after icon-only. Preserve the
`cdr-button--has-icon-left` / `cdr-button--has-icon-right` marker for icon spacing.
Use a native `disabled` attribute and an accessible name on icon-only buttons.

For plain CSS, load `dist/css/CdrButton.css` with the same token styles and use
`class="cdr-button cdr-button--primary"`. Add `cdr-button--primary-elevated` for
elevation; responsive modifiers use names such as `cdr-button--small@sm`.
No Vue import or runtime is needed in either consumption path.

The generator and shared recipe are published in the
[Cedar fork](https://github.com/c4rlosviteri/rei-cedar/tree/1b267cc3e4dba959561467b81e082eb2651d9e3c).
The source changes are reviewable in [Cedar PR #1](https://github.com/c4rlosviteri/rei-cedar/pull/1).
`build/cedar-source.json` pins that exact commit for reproducible builds. From a
clone of this fork, run:

```sh
# From rei-cedar-component-variables; use Node 22 as required by rei-cedar.
pnpm install --frozen-lockfile
pnpm setup:cedar
pnpm build:all
pnpm test:all
pnpm --dir ../rei-cedar exec playwright test --config playwright.component-variables.config.ts
```

`setup:cedar` clones the pinned revision from the Cedar fork into a sibling
`rei-cedar` checkout if missing and installs its build dependencies. An existing
checkout must already be at the pinned commit; setup leaves local changes intact
and rejects other revisions without resetting them. After editing the contract
or recipe, use `build:button` directly.

`build:button` regenerates maps and mixins from the contract, copies their Sass
dependencies, and builds CSS plus an offline demo at `dist/demo/CdrButton.html`.
Edit the contract or shared recipe in Cedar, never the generated `dist` files.
The exported Sass resolves tokens through their physical package path, so plain
Dart Sass works with `node_modules` on its load path. The standalone
`cedar-component-variables.scss` remains a flattened file; `index.scss` forwards
the individual modules.

### Build all components

`pnpm build:all` runs Cedar's `build:variables`, regenerating the contract maps
before exporting every supported Sass entrypoint and its local dependencies. It
then rebuilds the documentation examples. Use `pnpm build:button` for a scoped
Button rebuild, or `pnpm --dir ../rei-cedar build:variables` to run the full
transfer directly.

The full build covers all 19 documented components: Breadcrumb, Button, Caption,
Card, Checkbox, Chip, FormError, FormGroup, Grid, Input, LabelStandalone,
LabelWrapper, Link, List, Quote, Radio, Select, Skeleton and Table. Components
with TypeScript contracts use their generated maps; the others retain their
source Sass recipes. Structural values receive contract-derived fallbacks so
they work without the custom properties initialized by a Vue component. Link's
colors/states and Caption's styles use recipes shared with Vue.

Load the semantic token families once when using the full package:

```js
import '@rei/cdr-tokens/css';
import '@rei/cdr-tokens/css/color-surface';
import '@rei/cdr-tokens/css/color-action';
import '@rei/cdr-tokens/css/color-control';
import '@rei/cdr-tokens/css/color-feedback';
```

`pnpm test:all` checks setup, all documentation examples, the index and the
standalone bundle. Browser tests also check default values, inherited overrides
and semantic dependencies without Vue. This build exports Sass for all supported
components; the complete class-based CSS and offline demo are specific to Button.

The preview retains the PR's scoped alpha.2 fixes for the missing white border
and incorrect brand values. Remove those shared recipe overrides when upstream
token data is corrected. This work targets SCSS/CSS; it does not add LESS output.

SCSS example:
```
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss'; /* import the tokens file */
@import '@rei/cdr-component-variables/dist/scss/index.scss'; /* import the component variables */

.your-button-class {
  /* use mixins to apply many properties at once */
  @include cdr-button-base-mixin;
  @include cdr-button-primary-mixin;
}

```

LESS example:
```
@import '@rei/cdr-tokens/dist/rei-dot-com/less/cdr-tokens.less'; /* import the tokens file */
@import '@rei/cdr-component-variables/dist/less/index.less'; /* import the component variables */

.your-button-class {
  /* use mixins to apply many properties at once */
  .cdr-button-base-mixin();
  .cdr-button-primary-mixin();
}

```

The [docs page](https://cedar.rei.com/components/component-variables) demonstrates which mixins to use to achieve various styles for each supported component.

You can find all of the exported mixins in the [/dist directory](https://github.com/rei/rei-cedar-component-variables/tree/next/dist/scss).

If you are unsure of how a mixin is intended to be used, you can search for the name in the [Cedar component source](https://github.com/rei/rei-cedar/tree/next/src/components).

The [example project](https://github.com/rei/rei-cedar-component-variables-example) demonstrates how to use Cedar tokens and component variables to generate a CSS stylesheet that applies Cedar to arbitrary HTML markup.

## Development

The `/dist` folder in this project should never be edited directly as it is meant to stay in sync with Cedar. This package should be updated whenever component variable support is added to a new component, or whenever the markup/styling for a supported component changes.

To add support for a new component, update the supported list in Cedar's
`build/component-variables-transfer.ts`, add its JSON file to `/examples`, and
export that JSON from `/examples/index.js`. Then run `pnpm build:all` and
`pnpm test:all` from this repository.

Update steps:
- Ensure that your copy of `rei-cedar` and `rei-cedar-component-variables` are in the same directory
- Run  `pnpm run build:variables` script in `rei-cedar` to copy the variable files for all supported components into this repository. If you are adding support for a component, you will need to update that build script. If there are no changes to the `/dist` directory, then there is no need to do anything else.
- Update the `@rei/cdr-tokens` and `@rei/cedar` dependencies in this project's `package.json` to match the versions used to generate the component variables.
- Update `/examples` as needed
- Run the `pnpm run prepublishOnly` script inside this repository to process the imported stylesheets
- Bump the version of this package

### Adding Examples to the Doc-site

The examples generated by this project demonstrate how the component variables can be used to re-create the Vue.js Cedar components. This example code is used on the doc site [component variables page](https://cedar.rei.com/components/component-variables/).

That data is stored as JSON which uses the following structure:

```
{
  "name": "cdr-example", // Name used for the doc site section and construction of the example CSS classes
  "notes": [
    "notes/caveats about using these mixins properly"
  ],
  "examples": [
    {
      "name": "default", // Name for this example, used in the construction of the example class name
      "html": "<div class=\"cdr-example-default\"></div>", // HTML demonstrating application of the example class to a plain HTML element
      "scss": ["@include cdr-example-base-mixin;", "@include cdr-example-modifier-mixin;"] // SCSS code used to compile the example class.
      // The classname will be autogenerated using the "name" for this component (cdr-example) combined with the "name" for this example (default)
      // The generated classname should be used in the "HTML" field
      // This SCSS code is also rendered on the doc site in plain text for example purposes
    },
    {
      "name": "nested",
      "html": "<div class=\"cdr-example-nested\"><button class=\"cdr-example-nested-button\"></button></div>",
      "scss": [
        "@include cdr-example-base-mixin;",
        "@include cdr-example-modifier-mixin;",
        ".cdr-example-nested-button { @include cdr-example-button-mixin; }" // Additional nested CSS classes can be defined as needed within the parent example class
      ]
    }
  ]
}

```

See [the examples directory](https://github.com/rei/rei-cedar-component-variables/tree/master/examples) for more instances of how this JSON is constructed, or the [Example component](https://github.com/rei/rei-cedar-docs/blob/next/docs/.vuepress/components/ComponentVariablesPage.vue) to see how this JSON is used in the doc site. The example CSS classes that are generated for the docs can be found in [`/dist/docs/index.scss`](https://github.com/rei/rei-cedar-component-variables/blob/next/dist/docs/index.scss) and may be useful for debugging updates

#### Testing Example Code

1. Pull in updates from Cedar by running the `build:variables` script in `rei-cedar`, update example JSON code, or add new example files and export them from `examples/index.js` as needed.
2. Run `pnpm run prepublishOnly` to build this repo and export the docs data
3. Run `pnpm link --global` to register your local copy of component variables with these changes
4. In `rei-cedar-docs`, stop your dev server and run `pnpm link --global @rei/cdr-component-variables`
5. Restart the cedar docs dev server and inspect your changes on the `components/component-variables` page
