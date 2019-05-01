cdr-component-variables
------------------

Component variables exported from [Cedar](https://github.com/rei/rei-cedar). These are intended to be used by teams that cannot consume the Cedar vue components but still need to visually conform to the design system.

Component variables provide a versioned method for teams to import the exact CSS styles that are currently being used inside Cedar components and use them in whatever way fits their architecture. For example, this package makes available variables like `$cdr-button-base-border-radius` which is the border-radius value for all Cedar button components, as well as mixins like `@include cdr-button-base-mixin` which sets many properties on an element including the border-radius.

These variables and mixins are intended to be used to match the styling of the component/element that they correspond to. For example, `$cdr-button-base-border-radius` should only be used to style the border-radius of a "button-like" element.

## supported components

See the [docs page](https://rei.github.io/rei-cedar-component-variables/#/) for a list of supported components and examples of how they can be used.
If there is a component that you would like to see supported, please [open an issue here](https://github.com/rei/rei-cedar-component-variables/issues).
If you are trying to build a component that is not in Cedar, you should instead use the [design tokens](https://github.com/rei/rei-cedar-tokens).

## install

The component variables inherit values from the design tokens, so you will need to install both packages:

`npm install --save-dev @rei/cdr-tokens@1.0.0 @rei/cdr-component-variables`

Your project must be able to compile sass/scss files in order to make use of this package.

The `/dist` folder in this package contains the individual `vars.scss` files for each of the supported components, as well as some global variables that are used internally. This package makes available a `/dist/scss/index.scss` file which contains import statements for all of the `vars.scss` files, as well as an `dist/scss/cedar-component-variables.scss` file which contains all of the `vars.scss` files concatenated into a single file.

## usage

```
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss'; /* import the tokens file */
@import '@rei/cdr-component-variables/dist/scss/index.scss'; /* import the component variables */

.your-element-class {
  /* use mixins to apply many properties at once */
  @include cdr-COMPONENT-NAME-base-mixin;
}

.your-other-element-class {
  /* use variables if you need to apply specific properties */
  border-radius: $cdr-COMPONENT-NAME-border-radius'
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
- Update the `cdr-tokens` dependencies in this project's `package.json` so that the version exactly matches the version currently being used in `rei-cedar`
- Update `/examples` as needed. Note that you will need to re-start the `serve` script any time the example SCSS code changes.
- Bump the version of this package
- Run the `build:docs` script in this project
