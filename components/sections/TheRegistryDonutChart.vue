<template>
  <div>
    <DonutChart :data="chartData" />
  </div>
</template>

<script>
import Vue from 'vue'

import DonutChart from '~/components/charts/DonutChart'

export default Vue.extend({
  name: 'the-registry-donut-chart',
  components: {
    DonutChart,
  },
  computed: {
    registry() {
      return this.$store.getters['registry/data']
    },
    ageGroups() {
      return this.$store.getters['registry/ageGroups']
    },
    colors() {
      return this.$store.getters['registry/selectedColors']
    },
    datasets() {
      const selectedData = this.$store.getters['registry/selectedData']

      const grouped = Object.values(selectedData).reduce(
        (accumulator, current) => {
          Object.keys(current).forEach((key) => {
            accumulator[key]
              ? (accumulator[key] = [...accumulator[key], current[key]])
              : (accumulator[key] = [current[key]])
          })

          return accumulator
        },
        {}
      )

      const formatted = Object.values(grouped).map((data, index) => ({
        data,
        backgroundColor: this.colors[index],
      }))

      return formatted
    },
    chartData() {
      return {
        labels: this.ageGroups,
        datasets: this.datasets,
      }
    },
  },
})
</script>
