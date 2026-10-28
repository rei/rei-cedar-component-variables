# Component variables

Use Cedar's styles with your own HTML, without importing Vue components.
The package exports Sass mixins and contract maps for the 19 documented
components.

## Build

Use Node 22. From this repository:

```sh
pnpm install --frozen-lockfile
pnpm setup:cedar
pnpm build:all
pnpm test:all
```

`build/cedar-source.json` pins the source revision in the
[Cedar repository](https://github.com/rei/rei-cedar/tree/5da2c6e8875ca2c8748ea66fa8d2cc9b7a9b3379).
The implementation is reviewed in [Cedar PR #255](https://github.com/rei/rei-cedar/pull/255).
`setup:cedar` clones that revision into a sibling `rei-cedar` checkout and installs
its dependencies. Existing checkouts must already be at the pinned revision;
setup preserves local work and rejects other revisions without resetting them.

`build:all` regenerates maps from Cedar's TypeScript contracts, exports each
component's `*.vars.scss` and dependencies, and rebuilds documentation examples.
All components use the same export path. Structural styles stay in their vars
files; values come from contract maps. Contract defaults make the styles work
without Vue initializing custom properties.

The supported components are Breadcrumb, Button, Caption, Card, Checkbox, Chip,
FormError, FormGroup, Grid, Input, LabelStandalone, LabelWrapper, Link, List,
Quote, Radio, Select, Skeleton and Table.

## Use

Install `@rei/cdr-component-variables` and `@rei/cdr-tokens@15.0.0-alpha.4`.
Load the runtime token styles once; the main entry includes the semantic
foundations:

```js
import '@rei/cdr-tokens/css';
```

Apply the mixins to your own selectors:

```scss
@use '@rei/cdr-component-variables/dist/scss/index' as cedar;

.product-card {
  @include cedar.cdr-card-base-mixin;
}
```

`dist/scss/index.scss` forwards the individual component entrypoints.
`dist/scss/cedar-component-variables.scss` provides a standalone bundle.
Both work with standard Dart Sass and `node_modules` on its load path.
Use the semantic hooks defined by the component contracts for overrides.

## Development

Edit contracts and styles in Cedar, and examples in this repository. Run
`pnpm build:all` to regenerate `dist`; do not edit the output manually.

To add a component, update the supported list in Cedar's
`build/component-variables-transfer.ts`, add its example JSON and export it
from `examples/index.js`.

`pnpm test:all` checks setup, the source entrypoints' public mixins, all 81
examples, contract defaults and equivalent CSS from the index and detached
bundle. Browser checks run from Cedar:

```sh
pnpm --dir ../rei-cedar exec playwright test --config playwright.component-variables.config.ts
```

Documentation examples are generated in `dist/docs` from `examples/*.json`.
