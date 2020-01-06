<script>
import Example from './Example';

export default {
  name: 'comp-block',
  components: {
    Example,
  },
  props: {
    compData: Object,
  },
}
</script>

<template>
  <div class="comp-block" data-backstop="capture">
    <h3 class="heading">
      <a :id="compData.name" :href="`#${compData.name}`">
        {{ compData.name }}
      </a>
    </h3>
    <ul>
      <li v-for="(note, i) in compData.notes" :key="`${compData.name}-note-${i}`">
        {{ note }}
      </li>
    </ul>
    <a class="docs-link" :href="compData.docs" target="_blank">
      Cedar component documentation
    </a>

    <table>
      <tr class="header-row">
        <th>variables example</th>
        <th>tag</th>
        <th>code</th>
        <th>vue component</th>
      </tr>
      <example
        v-for="example in compData.examples"
        :key="`${compData.name}-${example.name}`"
        :example="example"
        :name="compData.name"
      />
    </table>
  </div>
</template>

<style lang="scss" scoped>
@import "~@rei/cdr-tokens/dist/scss/cdr-tokens.scss";

.heading {
  @include cdr-text-heading-serif-700;
  margin: $cdr-space-one-x;
}

.docs-link {
  margin-left: $cdr-space-one-x;
}

.comp-block {
  margin-top: $cdr-space-two-x;
}

.header-row th {
  padding-left: $cdr-space-one-x;
}

table {
  width: 100%;
}

</style>
