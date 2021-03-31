<template>
  <BarChart :data="chartData" />
</template>

<script>
import Vue from 'vue'

import BarChart from '~/components/charts/BarChart'

export default Vue.extend({
  name: 'the-somministrations-bar-chart',
  components: {
    BarChart,
  },
  computed: {
    somministrations() {
      return this.$store.getters['somministrations/data']
    },
    chartData() {
      return {
        labels: this.$store.getters['map/selectedRegions'],
        datasets: this.datasets,
      }
    },
    datasets() {
      const providedDoses = this.generateDataset(
        'dosesAdministered',
        'rgba(0, 0, 255, 0.5)'
      )
      const givenDoses = this.generateDataset(
        'deliveredDoses',
        'rgba(0, 255, 0, 0.5)'
      )

      return [givenDoses, providedDoses]
    },
  },
  methods: {
    generateDataset(label, backgroundColor) {
      const selectedRegions = this.$store.getters['map/selectedRegions']
      const selectedData = this.somministrations.filter((region) =>
        selectedRegions.includes(region.areaName)
      )

      return {
        label,
        data: selectedData.map((el) => el[label]),
        backgroundColor,
        orderWidth: 4,
      }
    },
  },
})
</script>
