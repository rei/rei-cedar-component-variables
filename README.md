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

### Build from migrated Cedar sources

The styles come from the [Cedar fork](https://github.com/c4rlosviteri/rei-cedar/tree/c9be856ed5e6e44622213a9a745ed2638a92ab6f),
built on [rei/rei-cedar#249](https://github.com/rei/rei-cedar/pull/249).
The source changes are reviewable in
[Cedar PR #1](https://github.com/c4rlosviteri/rei-cedar/pull/1).
`build/cedar-source.json` pins that published revision for reproducible builds.

```sh
# From rei-cedar-component-variables; use Node 22.
pnpm install --frozen-lockfile
pnpm setup:cedar
pnpm build:all
pnpm test:all
pnpm --dir ../rei-cedar exec playwright test --config playwright.component-variables.config.ts
```

`setup:cedar` clones the pinned revision into a sibling `rei-cedar` checkout if
missing and installs its build dependencies. An existing checkout must already
be at the pinned commit; setup preserves local work and rejects other revisions
without resetting them. After editing contracts or recipes, rebuild directly.

`build:all` runs Cedar's `build:variables`: regenerate contract maps, export every
supported Sass entrypoint and its dependencies, and build the index and standalone
bundle. It then rebuilds the documentation examples. Every component uses the
same export path. Components without contracts retain their source Sass recipes.

The build covers all 19 documented components: Breadcrumb, Button, Caption,
Card, Checkbox, Chip, FormError, FormGroup, Grid, Input, LabelStandalone,
LabelWrapper, Link, List, Quote, Radio, Select, Skeleton and Table.

Shared pressable recipes use common mixin, CSS and demo generators. Names,
variants, sizes and compatibility hooks come from their contracts. There is no
Button-only build script or generator branch. The component's shared Sass recipe
still owns its selectors and interaction behavior. All 39 existing package
files remain byte-identical, including the CSS and offline demo artifacts.

Structural fallbacks from the contracts make styles work without Vue initializing
custom properties. Shared recipes initialize their own defaults. Load the runtime
token CSS once when using the full package:

```js
import '@rei/cdr-tokens/css';
import '@rei/cdr-tokens/css/color-surface';
import '@rei/cdr-tokens/css/color-action';
import '@rei/cdr-tokens/css/color-control';
import '@rei/cdr-tokens/css/color-feedback';
```

Use `@rei/cdr-tokens@15.0.0-alpha.2`. The existing public mixins and component
hooks are preserved, with new semantic hooks taking precedence. Old global color-token
overrides must migrate to component hooks. Colors and focus follow the
migration; this does not promise pixel identity with v11.

Edit contracts and recipes in Cedar, and regenerate this package's `dist` files.
Token imports work with standard Dart Sass and `node_modules` on its load path.
`index.scss` forwards individual modules; `cedar-component-variables.scss` is a
flattened standalone file. No Vue runtime is required.

`test:all` checks setup, all 81 examples, legacy APIs, package entrypoints and
byte-identical output against the pre-generalization baseline. Browser tests
check variants, interaction states, responsive boundaries, inherited overrides
and semantic dependencies. The build exports Sass for all components and
retains CSS/demo output for shared pressable recipes. It does not generate LESS.

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
