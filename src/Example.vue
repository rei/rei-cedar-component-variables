<script>

export default {
  name: 'example',
  props: {
    example: Object,
    name: String,
  },
  computed: {
    className() {
      return `${this.name}-${this.example.name}`
    },
    codeBlock() {
      // transforms example code to add github search queries to all mixins/variables
      return this.example.styles.map(line => {
        const varName = line.match(/(cdr-[a-z-]+)/)[0];
        // TODO: once vars get merged into cedar, update this query to point at that repo
        const link = `<a href="https://github.com/rei/rei-cedar-component-variables/search?q=${varName}+path%3A%2Fdist%2Fscss+filename%3A%2A.vars.scss" target="_blank">${varName}</a>`;

        return line.replace(varName, link);
      }).join("\n")
    },
    exampleContent() {
      return `${this.example.preContent || ''}${this.example.name}${this.example.postContent || ''}${this.example.slot || ''}`
    },
    componentName() {
      return this.name.replace(/--.+/, '');
    }
  }
}
</script>

<template>
  <tr class="example-row">

    <td>
      <component
        :is="example.tag"
        :class="className"
        href="#"
        v-html="exampleContent"
        v-bind="example.props"
      />
    </td>


    <td>
      {{ `<${example.tag} />` }} <!-- eslint-disable-line -->
    </td>

    <td>
      <pre class="code-block"><code v-html="codeBlock"/></pre>
    </td>

    <td>
      <div v-if="example.attrs">
        <component v-if="example.slot" :is="componentName" v-bind="example.attrs" v-html="example.slot"/>
        <component v-else :is="componentName" v-bind="example.attrs">{{this.example.name}}</component>
      </div>
    </td>

  </tr>
</template>

<style lang="scss" scoped>
@import "~@rei/cdr-tokens/dist/scss/cdr-tokens.scss";

.example-row td {
  border: 1px solid $cdr-color-border-primary-lightmode;
  padding: $cdr-space-one-x;
  width: 25%;
}

.example-row td:last-child {
  width: 50%;
}

.code-block code {
  font-size: $cdr-text-default-compact-size;
  user-select: all;
}

</style>
