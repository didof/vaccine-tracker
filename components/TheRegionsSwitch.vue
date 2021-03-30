<template>
  <b-switch v-model="state">Toggle regions</b-switch>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'the-regions-switch',
  emits: ['change'],
  data() {
    return {
      state: true,
    }
  },
  computed: {
    itemsLength() {
      return this.$store.getters['map/regionsAmount']
    },
    items() {
      return this.$store.getters['map/selectedRegions']
    },
  },
  watch: {
    items(value) {
      if (value.length === 0) this.state = false
      if (value.length === this.itemsLength) this.state = true
    },
    state(value) {
      const action = value
        ? 'map/fullSelectedRegions'
        : 'map/emptySelectedRegions'

      this.$store.dispatch(action)
    },
  },
})
</script>
