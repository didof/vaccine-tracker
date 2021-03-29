<template>
  <b-switch size="is-large" v-model="state">All regions</b-switch>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'region-switch',
  emits: ['change'],
  props: {
    watchItems: {
      type: Array,
      require: true,
    },
    itemsLength: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      state: true,
    }
  },
  watch: {
    state(value) {
      this.$emit('change', value)
    },
    watchItems(value) {
      if (value.length === 0) this.state = false
      if (value.length === this.itemsLength) {
        this.state = true
        this.$buefy.toast.open({
          message: 'All Regions selected',
          queue: false,
        })
      }
    },
  },
})
</script>
