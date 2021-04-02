<template>
  <b-table :data="data" :columns="columns" :checkable="checkable"></b-table>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    data: {
      type: Array,
      require: true,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    columns() {
      return Object.keys(this.data[0]).map((element) => ({
        field: element,
        label: element,
        centered: true,
      }))
    },
  },
})
</script>
