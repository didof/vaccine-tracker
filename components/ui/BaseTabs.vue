<template>
  <section>
    <b-tabs v-model="activeTab">
      <b-tab-item v-for="tab in tabs" :key="tab.label" :label="tab.label">
        <component :is="tab.component"></component>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'base-tabs',
  data() {
    return {
      activeTab: 0,
    }
  },
  props: {
    tabs: {
      type: Array,
      require: true,
    },
  },
})
</script>
