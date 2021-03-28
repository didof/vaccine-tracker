<template>
  <b-switch size="is-large" v-model="isDarkMode"></b-switch>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'color-mode-switch',
  data() {
    return {
      isDarkMode: this.$colorMode.value === 'dark',
    }
  },
  beforeMount() {
    this.$colorMode.value = 'dark'
  },
  watch: {
    isDarkMode(value) {
      this.$colorMode.value = this.isDarkMode ? 'dark' : 'light'
    },
  },
})
</script>
