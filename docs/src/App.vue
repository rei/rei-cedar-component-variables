<script>
import varsPackage from '../../package.json';
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
      return varsPackage.version;
    },
    tokensVersion() {
      return varsPackage.peerDependencies['@rei/cdr-tokens'];
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
    <p class="sub-heading">Exported from rei-cedar@{{ cedarVersion }}. Depends on rei-cedar-tokens@{{ tokensVersion }}.</p>
    <p>
      - For information on how to install and use this package, see the <a href="https://github.com/rei/rei-cedar-component-variables">README.md</a>
    </p>
    <hr/>
    <div class="cdr-container">
      <comp-block v-for="compData in compExamples" :key="compData.name" :comp-data="compData"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@rei/cdr-tokens/dist/scss/cdr-tokens.scss";

.heading {
  // @include cdr-text-header-2;
}

.sub-heading {
  // @include cdr-text-default;
}

a {
  color: $cdr-color-text-link-lightmode;
}
</style>
