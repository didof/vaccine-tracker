<template>
  <div class="section">
    <pre>{{ administrations }}</pre>
    <div class="container is-fluid columns">
      <div class="column"><BarChart :data="chartData" /></div>
      <div class="column is-5 section">
        <TheRegionsSwitch /><TheItalyMap /><TheRegionsTagList /><TheAutoCompleteRegionsInputField />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import fetchAndStore from '~/utils/fetchAndStore'

import BarChart from '~/components/charts/BarChart'
import TheItalyMap from '~/components/TheItalyMap'
import TheRegionsSwitch from '~/components/TheRegionsSwitch'
import TheRegionsTagList from '~/components/TheRegionsTagList'
import TheAutoCompleteRegionsInputField from '~/components/TheAutoCompleteRegionsInputField'

export default Vue.extend({
  name: 'page-somministrations',
  components: {
    BarChart,
    TheItalyMap,
    TheRegionsSwitch,
    TheRegionsTagList,
    TheAutoCompleteRegionsInputField,
  },
  async fetch(context) {
    await fetchAndStore('somministrations', context)
    await fetchAndStore('administrations', context)
  },
  computed: {
    somministrations() {
      return this.$store.getters['somministrations/data']
    },
    administrations() {
      return this.$store.getters['administrations/data']
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
