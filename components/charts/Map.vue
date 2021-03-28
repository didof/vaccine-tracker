<template>
  <div>
    <svg width="100%" height="100%" viewBox="-200 0 900 800">
      <path
        v-for="path in paths"
        :key="path.id"
        :d="path.d"
        :title="path.title"
        :fill="fill(path.title)"
        stroke="white"
        @mouseover="test(path.title)"
      ></path>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'

import italy from '~/assets/svg/italy'

export default Vue.extend({
  data() {
    return {
      hasMounted: false,
      paths: [],
      data: null,
      min: null,
      denominator: null,
    }
  },
  created() {
    this.paths = italy.g.path

    this.data = this.$store.getters['data/somministrationsData']
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
    test(region) {
      console.log(region)
    },
  },
})
</script>
