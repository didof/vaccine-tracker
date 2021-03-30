<template>
  <b-field label="Selected Regions">
    <b-taglist>
      <span
        class="tag"
        :class="getClass(tag)"
        v-for="tag in selectedRegions"
        :key="tag"
        @click="onClick(tag)"
        @mouseenter="onEnter(tag)"
        @mouseleave="onLeave"
        >{{ tag }}</span
      >
    </b-taglist>
  </b-field>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'the-regions-tag-list',
  computed: {
    selectedRegions() {
      return this.$store.getters['map/selectedRegions']
    },
    focusedElement() {
      return this.$store.getters['map/focusedRegion']
    },
  },
  methods: {
    getClass(value) {
      return value === this.focusedElement ? 'is-success' : 'is-link is-light'
    },
    onClick(value) {
      const filtered = this.selectedRegions.filter((region) => region !== value)
      this.$store.dispatch('map/setSelectedRegions', filtered)
    },
    onEnter(value) {
      this.$store.dispatch('map/setFocusedRegion', value)
    },
    onLeave() {
      this.$store.dispatch('map/setFocusedRegion', null)
    },
  },
})
</script>

<style scoped>
span {
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.2s ease-in-out 0.1s;
}
</style>
