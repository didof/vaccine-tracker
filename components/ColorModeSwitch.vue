<template>
  <b-switch size="is-large" v-model="isDarkMode"></b-switch>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'color-mode-switch',
  data() {
    return {
      isDarkMode: false,
    }
  },
  watch: {
    isDarkMode(value) {
      console.log(value)
    },
  },
})
</script>
