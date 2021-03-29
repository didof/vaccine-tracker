<template>
  <div>
    <h1 class="title">{{ selectedRegion }}</h1>
    <svg width="100%" height="100%" viewBox="-200 0 900 800">
      <path
        v-for="path in paths"
        :key="path.id"
        :d="path.d"
        :title="path.title"
        :fill="fill(path.title)"
        stroke="white"
        @mouseover="onRegionHover(path.title)"
      ></path>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'

import italy from '~/assets/svg/italy'

export default Vue.extend({
  emits: ['region-hover'],
  data() {
    return {
      hasMounted: false,
      paths: [],
      data: null,
      min: null,
      denominator: null,
      selectedRegion: '',
    }
  },
  created() {
    this.paths = italy

    this.data = this.$store.getters['somministrations/data']
    const values = this.data.map((region) => region.dosi_somministrate)
    this.min = Math.min(...values)
    const max = Math.max(...values)
    this.denominator = max - this.min
  },
  methods: {
    normalize(value) {
      return (value - this.min) / this.denominator
    },
    fill(regionName) {
      const regionTarget = this.data.find(
        (region) => region.nome_area === regionName
      )

      if (!regionTarget) return 'blue'

      const normalized = this.normalize(regionTarget.dosi_somministrate)

      return `rgba(0, 0, 255, ${normalized})`
    },
    onRegionHover(regionName) {
      this.$emit('region-hover', regionName)
    },
  },
})
</script>
