cdr-component-variables
------------------

Component variables provide a versioned method for teams to import the exact CSS styles being used in the Cedar vue components and apply them to elements in their project. See the [Cedar docs](https://rei.github.io/rei-cedar-docs/foundation/component-variables/) for more high level information about component variables.

## supported components

See the [docs page](https://rei.github.io/rei-cedar-component-variables/#/) for a list of supported components and examples of how they can be used.
If there is a component that you would like to see supported, please [open an issue here](https://github.com/rei/rei-cedar-component-variables/issues).
If you are trying to build a component that is not in Cedar, you should instead use the [design tokens](https://github.com/rei/rei-cedar-tokens).

## install

The component variables inherit values from the design tokens, so you will need to install both packages:

`npm install --save-dev @rei/cdr-tokens@1.0.0 @rei/cdr-component-variables`

Your project must be able to compile SCSS or LESS in order to make use of this package.

This package contains `/dist/less` and `/dist/scss` folders, each of which contains `*.vars.{less|scss}` for each component, as well as an `index.{scss|less}` that imports all of those files. It is recommended that you use the `index` file to ensure that all variables are loaded in the correct order. A `dist/{scss|less}/cedar-component-variables.{scss|less}` file is also available which concatenates all of the variable files together.

## usage

SCSS example:
```
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss'; /* import the tokens file */
@import '@rei/cdr-component-variables/dist/scss/index.scss'; /* import the component variables */

.your-button-class {
  /* use mixins to apply many properties at once */
  @include cdr-button-base-mixin;
  @include cdr-button-primary-mixin;
}

.your-other-button-class {
  /* use variables if you need to apply specific properties */
  border-radius: $cdr-button-border-radius;
}
```

LESS example:
```
@import '@rei/cdr-tokens/dist/less/cdr-tokens.less'; /* import the tokens file */
@import '@rei/cdr-component-variables/dist/less/index.less'; /* import the component variables */

.your-button-class {
  /* use mixins to apply many properties at once */
  .cdr-button-base-mixin();
  .cdr-button-primary-mixin();
}

.your-other-button-class {
  /* use variables if you need to apply specific properties */
  border-radius: @cdr-button-border-radius;
}
```

The [docs page](https://rei.github.io/rei-cedar-component-variables/#/) demonstrates which mixins to use to achieve various styles for each supported component.

You can find all of the exported variables and mixins in the [/dist directory](https://github.com/rei/rei-cedar-component-variables/tree/next/dist/scss).

If you are unsure of how a variable or mixin is intended to be used, you can search for the variable name in the [Cedar component source](https://github.com/rei/rei-cedar/tree/next/src/components).

## development

The `/dist` folder in this project should never be edited directly as it is meant to stay in sync with Cedar. This package should be updated whenever component variable support is added to a new component, or whenever the markup/styling for a supported component changes.

Update steps:
- Ensure that your copy of `rei-cedar` and `rei-cedar-component-variables` are in the same directory
- Run the `build:variables` script in `rei-cedar` to copy the variable files for all supported components into this repository. If you are adding support for a component, you will need to update that build script. If there are no changes to the `/dist` directory, then there is no need to do anything else.
- Run the `build:less` script inside this repository to create a LESS copy of the previous SASS export
- Update the `cdr-tokens` dependencies in this project's `package.json` so that the version exactly matches the version currently being used in `rei-cedar`
- Update `/examples` as needed. Note that you will need to re-start the `serve` script any time the example SCSS code changes.
- Bump the version of this package
- Run the `build:docs` script in this project


### generating new examples/docs


"CV example":
"Vue example":

```
{
  "name": "Example Name (i.e, default, primary, secondary).",
  "tag": "HTML tag to use for CV example",
  "styles": [
    "SCSS code to use to build CV example CSS",
    "another line of SCSS"
  ],
  "preContent": "HTML to append before the `name` inside of the CV example",
  "postContent": "HTML to append after the `name` inside of the CV example",
  "props": {
    "value": "default-input"
  },
  "slot": "used to set v-html on the Vue example.",
  "attrs": {
    "property": "value",
    "used to set arbitary"
  }
}
```
