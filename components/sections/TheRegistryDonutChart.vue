<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-space-around is-align-content-center"
  >
    <div class="buttons is-centered">
      <b-button
        v-for="option in Object.keys(options)"
        :key="option"
        :class="getButtonClass(option)"
        @click="onClick(option)"
        >{{ option }}</b-button
      >
    </div>
    <DonutChart :data="chartData" />
    <BaseTable :data="tableData" />
  </div>
</template>

<script>
import Vue from 'vue'

import DonutChart from '~/components/charts/DonutChart'
import BaseTable from '~/components/ui/BaseTable'

export default Vue.extend({
  name: 'the-registry-donut-chart',
  components: {
    DonutChart,
    BaseTable,
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
    selectedData() {
      return this.$store.getters['registry/selectedData']
    },
    options() {
      return this.$store.getters['registry/options']
    },
    selectedOption() {
      return this.$store.getters['registry/selectedOption']
    },
    selected() {
      return this.$store.getters['registry/selected']
    },
    datasets() {
      const grouped = Object.values(this.selectedData).reduce(
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
        backgroundColor: `rgba(${this.colors[index]}, 0.5)`,
        hoverBackgroundColor: `rgba(${this.colors[index]}, 0.7)`,
      }))

      return formatted
    },
    chartData() {
      return {
        labels: this.ageGroups,
        datasets: this.datasets,
      }
    },
    tableData() {
      const test = Object.entries(this.selectedData).reduce(
        (accumulator, current) => {
          accumulator.push({ category: current[0], ...current[1] })

          return accumulator
        },
        []
      )

      return test
    },
  },
  methods: {
    getButtonClass(value) {
      return { 'is-primary': value === this.selected }
    },
    onClick(value) {
      this.$store.dispatch('registry/setSelected', value)
    },
  },
})
</script>
