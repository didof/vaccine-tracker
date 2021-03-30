<template>
  <div>
    <svg width="100%" height="100%" viewBox="-200 0 900 800">
      <path
        v-for="path in paths"
        :key="path.id"
        :d="path.d"
        :title="path.title"
        :fill="fill(path.title)"
        @click="$emit('path-click', path.title)"
        @mouseenter="$emit('path-enter', path.title)"
        @mouseleave="$emit('path-leave')"
      ></path>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'svg-map',
  emits: ['path-click', 'path-enter', 'path-leave'],
  props: {
    data: {
      type: Array,
      require: true,
    },
    paths: {
      type: Array,
      require: true,
    },
    filterBy: {
      type: String,
      require: true,
    },
    elementIdentifier: {
      type: String,
      require: true,
    },
    activeList: {
      type: Array,
      require: true,
    },
    focusedElement: {
      type: String,
      require: false,
    },
  },
  data() {
    return {
      min: null,
      denominator: null,
    }
  },
  computed: {
    normalizeUtils() {
      const values = this.data.map((el) => el[this.filterBy])
      const min = Math.min(...values)
      const denominator = Math.max(...values) - min
      return [min, denominator]
    },
  },
  methods: {
    normalize(value) {
      const [min, denominator] = this.normalizeUtils
      return (value - min) / denominator
    },
    fill(title) {
      const grey = 'rgba(0, 0, 0, 0.3)'

      if (!this.activeList.includes(title)) return grey

      const found = this.data.find((el) => el[this.elementIdentifier] === title)

      if (!found) return grey

      let rgb = '0, 0, 255'

      if (title === this.focusedElement) rgb = '255, 255, 255'

      const a = this.normalize(found[this.filterBy])
      return `rgba(${rgb}, ${a})`
    },
  },
})
</script>

<style scoped>
path {
  cursor: pointer;
  transition: fill 0.3s ease-in-out, stroke 0.3s ease-in-out 0.1s,
    stroke-width 0.3s ease-in-out;
  stroke: white;
  stroke-width: 1;
}

path:hover {
  stroke: green;
  stroke-width: 4;
}
</style>
