<template>
  <b-tabs v-model="activeTab">
    <b-tab-item v-for="(label, index) in labels" :key="label" :label="label">
      <div v-if="index === activeTab">
        <slot :name="label">{{ label }}</slot>
      </div>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'one-per-time-tabs',
  props: {
    labels: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      activeTab: 0,
    }
  },
})
</script>
