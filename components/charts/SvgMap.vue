<template>
  <div>
    <svg width="100%" height="100%" viewBox="-200 0 900 800">
      <path
        v-for="path in paths"
        :key="path.id"
        :d="path.d"
        :title="path.title"
        :fill="fill(path.title)"
        :stroke="strokeColor(path.title)"
        :stroke-width="strokeWidth(path.title)"
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
  created() {
    const values = this.data.map((el) => el[this.filterBy])
    this.min = Math.min(...values)
    const max = Math.max(...values)
    this.denominator = max - this.min
  },
  methods: {
    normalize(value) {
      return (value - this.min) / this.denominator
    },
    fill(title) {
      if (!this.activeList.includes(title)) return 'rgba(0, 0, 0, 0.3)'

      const found = this.data.find((el) => el[this.elementIdentifier] === title)

      if (!found) return 'grey'

      let rgb = '0, 0, 255'

      if (title === this.focusedElement) rgb = '255, 255, 255'

      const a = this.normalize(found[this.filterBy])
      return `rgba(${rgb}, ${a})`
    },
    strokeColor(title) {
      return title === this.focusedElement ? 'blue' : 'white'
    },
    strokeWidth(title) {
      return title === this.focusedElement ? 3 : 1
    },
  },
})
</script>

<style scoped>
path {
  cursor: pointer;
}
</style>
