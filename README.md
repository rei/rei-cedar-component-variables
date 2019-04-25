cdr-component-variables
------------------

Component variables exported from [Cedar](https://github.com/rei/rei-cedar). These are intended to be used by teams that cannot consume the Cedar vue components but still need to visually conform to the design system.

## component variables

Component variables provide a versioned method for teams to import the exact CSS styles that are currently being used inside Cedar components and use them in whatever way fits their architecture. For example, this package makes available variables like `$cdr-button-base-border-radius` which is the border-radius value for all Cedar button components, as well as mixins like `@include cdr-button-base-mixin` which sets many properties on an element including the border-radius.

These variables and mixins are intended to be used only to match the styling of the component/element that they correspond to. For example, `$cdr-button-base-border-radius` should only be used to style the border-radius of a "button-like" element.

## supported components

See the [docs page](https://rei.github.io/rei-cedar-component-variables/#/) for a list of supported components.
If there is a component that you would like to see supported here, please [open an issue here](TODO).
If you are trying to build a component that is not in Cedar, you should instead use the [design tokens](https://github.com/rei/rei-cedar-tokens).

## install

The component variables inherit values from the design tokens, so you will need to install both packages:

`npm install --save-dev @rei/cdr-tokens @rei/cdr-component-variables`

Your project must be able to compile sass/scss files in order to make use of this package.

## usage

```
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss'; /* import the tokens file */
@import '@rei/cdr-component-variables/dist/scss/index.vars.scss'; /* import the component variables */

.your-element-class {
  /* use mixins to apply many properties at once */
  @include cdr-COMPONENT-NAME-base-mixin;
}

.your-other-element-class {
  /* use variables if you need to apply specific properties */
  border-radius: $cdr-COMPONENT-NAME-border-radius'
}
```

The [docs page](https://rei.github.io/rei-cedar-component-variables/#/) demonstrates which mixins to use to achieve various styles for each supported component. You can also look those mixins up to see which individual variables they are using.

You can find all of the exported variables and mixins in the [/dist directory](https://github.com/rei/rei-cedar-component-variables/tree/next/dist/scss).

If you are unsure of how a variable or mixin is intended to be used, you can search for the variable name in the [Cedar component source](https://github.com/rei/rei-cedar/tree/next/src/components).

## development

The `/dist` folder in this project should never be edited directly as it is meant to stay in sync with Cedar. This package should be updated whenever component variable support is added to a new component, or whenever the markup/styling for a supported component changes.

Update steps:
- Ensure that your copy of `rei-cedar` and `rei-cedar-component-variables` are in the same directory
- Run the `build:variables` script in `rei-cedar` to copy the variable files for all supported components into this repository. If you are adding support for a component, you will need to update that build script.
- Under `cdr-tokens` dependencies in this project so that the version exactly matches the version currently being used in `rei-cedar`
- Update `docs/examples` as needed
