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
        <!-- <BaseTabs :tabs="tabs" /> -->
        <OnePerTimeTabs :labels="['somministrations', 'administrations']">
          <template #somministrations>
            <TheSomministrationsBarChart />
          </template>
          <template #administrations>
            <TheAdministrationsTable />
          </template>
        </OnePerTimeTabs>
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

import ColorModeSwitch from '~/components/ColorModeSwitch'

import {
  TheAutoCompleteRegionsInputField,
  TheItalyMap,
  TheRegionsSwitch,
  TheRegionsTagList,
} from '~/components/cockpit'

import BaseTabs from '~/components/ui/BaseTabs'
import OnePerTimeTabs from '~/components/ui/OnePerTimeTabs'

import TheSomministrationsBarChart from '~/components/sections/TheSomministrationsBarChart'
import TheAdministrationsTable from '~/components/sections/TheAdministrationsTable'

export default Vue.extend({
  name: 'page-somministrations',
  components: {
    BaseTabs,
    OnePerTimeTabs,
    TheItalyMap,
    TheRegionsSwitch,
    TheRegionsTagList,
    TheAutoCompleteRegionsInputField,
    ColorModeSwitch,
    TheSomministrationsBarChart,
    TheAdministrationsTable,
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
