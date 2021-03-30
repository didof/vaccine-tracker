<template>
  <div class="section">
    <div class="container is-fluid columns">
      <div class="column"><BarChart :data="chartData" /></div>
      <div class="column is-4 section">
        <TheRegionsSwitch /><TheItalyMap /><TheRegionsTagList /><TheAutoCompleteRegionsInputField />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
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
  data() {
    return {
      data: [],
    }
  },
  mounted() {
    this.data = this.$store.getters['somministrations/data']
  },
  async fetch({ store, $axios }) {
    const hasAlreadyFetched =
      store.getters['somministrations/hasAlreadyFetched']

    let data
    if (!hasAlreadyFetched) {
      const url = store.getters['somministrations/url']

      try {
        data = await $axios.$get(url)
      } catch (err) {
        console.error(err)
      }

      store.dispatch('somministrations/setData', data)
    } else {
      data = store.getters['somministrations/data']
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.$store.getters['map/selectedRegions'],
        datasets: this.datasets,
      }
    },
    datasets() {
      const providedDoses = this.generateDataset(
        'dosi_somministrate',
        'rgba(0, 0, 255, 0.5)'
      )
      const givenDoses = this.generateDataset(
        'dosi_consegnate',
        'rgba(0, 255, 0, 0.5)'
      )

      return [givenDoses, providedDoses]
    },
  },
  methods: {
    generateDataset(label, backgroundColor) {
      const selectedRegions = this.$store.getters['map/selectedRegions']
      const selectedData = this.data.filter((region) =>
        selectedRegions.includes(region.nome_area)
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
