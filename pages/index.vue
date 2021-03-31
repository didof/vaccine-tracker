<template>
  <div class="section">
    <ColorModeSwitch />
    <div class="container is-fluid columns">
      <div class="column">
        <TheRegionsTagList />
      </div>
    </div>
    <div class="container is-fluid columns">
      <div class="column is-8">
        <BaseTabs :tabs="tabs" />
      </div>
      <div class="column is-4 section absolute">
        <TheItalyMap />
        <TheRegionsSwitch />
        <TheAutoCompleteRegionsInputField />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import fetchAndStore from '~/utils/fetchAndStore'

import BaseTabs from '~/components/ui/BaseTabs'
import TheSomministrationsBarChart from '~/components/TheSomministrationsBarChart'

import ColorModeSwitch from '~/components/ColorModeSwitch'

import TheItalyMap from '~/components/TheItalyMap'
import TheRegionsSwitch from '~/components/TheRegionsSwitch'
import TheRegionsTagList from '~/components/TheRegionsTagList'
import TheAutoCompleteRegionsInputField from '~/components/TheAutoCompleteRegionsInputField'
import TheAdministrationsTable from '~/components/TheAdministrationsTable'

export default Vue.extend({
  name: 'page-somministrations',
  components: {
    BaseTabs,
    TheItalyMap,
    TheRegionsSwitch,
    TheRegionsTagList,
    TheAutoCompleteRegionsInputField,
    ColorModeSwitch,
  },
  data() {
    return {
      tabs: [
        {
          label: 'Somministrations',
          component: TheSomministrationsBarChart,
        },
        {
          label: 'Administrations',
          component: TheAdministrationsTable,
        },
      ],
    }
  },
  async fetch(context) {
    await fetchAndStore('somministrations', context)
    await fetchAndStore('administrations', context)
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

<style scoped>
.absolute {
  position: fixed;
  top: 13%;
  right: 0;
}
</style>
