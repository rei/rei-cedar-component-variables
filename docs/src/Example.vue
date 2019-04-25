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
        const mixin = line.split('@include ');
        const isMixin = Boolean(mixin[1]);
        const variable = line.split('$');
        const query = (mixin[1] || variable[1]).replace(';', '');
        const link = `<a href="https://github.com/rei/rei-cedar/search?q=${query}" target="_blank">${query}</a>`;

        if (isMixin) {
          return `@include ${link};`;
        }

        return `${variable[0]}$${link};`;

      }).join("\n")
    },
  }
}
</script>

<template>
  <tr class="example-row">

    <td>
      {{ example.name }}
    </td>
    <td>
      <component :is="example.tag" :class="className" href="#">
        {{ example.content || example.name }}
      </component>
    </td>


    <td>
      {{ `<${example.tag} />` }} <!-- eslint-disable-line -->
    </td>

    <td>
      <pre class="code-block"><code v-html="codeBlock"/></pre>
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

.code-block code {
  font-size: $cdr-text-default-body-compact-size;
  user-select: all;
}

</style>
