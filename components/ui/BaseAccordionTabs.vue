<template>
  <p class="panel-tabs">
    <a v-for="tab in item.tabs" :key="tab">{{ tab }}</a>
  </p>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'base-accordion-tabs',
  props: {
    item: {
      type: Object,
      require: true,
    },
    tagsIdentifier: {
      type: String,
      require: true,
    },
  },
})
</script>
