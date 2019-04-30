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
      return packageJson.peerDependencies['@rei/cdr-tokens'];
    },
    cedarVersion() {
      // TODO: how to do this?
      return 'absolute-unit';
    }
  }
}
</script>

<template>
  <div class="cdr-container-fluid">
    <h2 class="heading">rei-cedar-component-variables@{{ packageVersion }} examples</h2>
    <ul class="sub-heading">
      <!--<li>Exported from rei-cedar@{{ cedarVersion }}.</li>-->
      <li>Depends on rei-cedar-tokens@{{ tokensVersion }}.</li>
      <li>Component variables are currently only exported in SCSS format.</li>
      <li>Example code on this page is intended to be added to a class that targets the HTML tag for that example.</li>
      <li>The links in the example code can be used to look up the definitions of mixins and variables on github, or you can also look them up manually in the `/dist` directory</li>
      <li>For more information on how to install and use this package, see the <a href="https://github.com/rei/rei-cedar-component-variables">README.md</a></li>
    </ul>

    <hr/>
    <div class="cdr-container">
      <comp-block v-for="compData in compExamples" :key="compData.name" :comp-data="compData"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@rei/cdr-tokens/dist/scss/cdr-tokens.scss";

.heading {
  @include cdr-text-header-2;
}

.sub-heading {
  @include cdr-text-default;
}

a {
  color: $cdr-color-text-link-lightmode;
}
</style>
