<script>
import packageJson from '../package.json';
import compExamples from '../examples';
import CompBlock from './CompBlock';

export default {
  name: 'app',
  components: {
    CompBlock,
  },
  data() {
    return {
      compExamples,
    }
  },
  computed: {
    packageVersion() {
      return packageJson.version;
    },
    tokensVersion() {
      return packageJson.dependencies['@rei/cdr-tokens'];
    },
    cedarVersion() {
      return packageJson.dependencies['@rei/cedar'];
    }
  }
}
</script>

<template>
  <div class="cdr-container-fluid">
    <h2 class="heading">rei-cedar-component-variables@{{ packageVersion }} examples</h2>
    <ul class="sub-heading">
      <li>
        Exported from rei-cedar@{{ cedarVersion }}.
      </li>
      <li>
        Depends on rei-cedar-tokens@{{ tokensVersion }}.
      </li>
      <li>
        All examples on this page are written in SCSS, but component variables are available in SCSS or LESS
      </li>
      <li>
        Example code on this page is intended to be added to a class that targets the HTML tag for that example.
      </li>
      <li>
        The links in the example code can be used to look up the definitions of mixins and variables on github, or you can also look them up manually in the `/dist` directory
      </li>
      <li>
        For more information on how to install and use this package, see the <a href="https://github.com/rei/rei-cedar-component-variables">README.md</a>
      </li>
      <li>
        We also maintain a <a href="https://codesandbox.io/s/qkwn78nw99">codesandbox</a> where you can experiment with using the variables
      </li>
    </ul>

    <hr/>
    <div class="cdr-container">
      <comp-block
        v-for="compData in compExamples"
        :key="compData.name"
        :comp-data="compData"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@rei/cdr-tokens/dist/scss/cdr-tokens.scss";

.heading {
  @include cdr-text-display-900;
}

.sub-heading {
  @include cdr-text-default;
}

a {
  color: $cdr-color-text-link-lightmode;
}
</style>
