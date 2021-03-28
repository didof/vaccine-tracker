<template>
  <section class="tile is-ancestor">
    <article class="tile is-child notification">
      <div class="content">
        <p class="title">Consegna e Somministrazione di Vaccini</p>
        <p class="subtitle">With even more content</p>
        <div class="content">
          <BarChart :labels="labels" :datasets="datasets" />
        </div>
      </div>
    </article>

    <article class="tile is-child notification">
      <div class="content">
        <p class="title">{{ selectedRegion }}</p>
        <p class="subtitle">{{ dosiSomministrate }}</p>
        <div class="content">
          <ItalyMap @region-hover="onRegionHover" />
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import Vue from 'vue'
import BarChart from '~/components/charts/BarChart'
import ItalyMap from '~/components/charts/Map'

export default Vue.extend({
  name: 'page-somministrations',
  components: {
    BarChart,
    ItalyMap,
  },
  data() {
    return {
      selectedRegion: '',
      dosiSomministrate: null,
    }
  },
  computed: {
    data() {
      return this.$store.getters['data/somministrationsData']
    },
    labels() {
      return this.data.map((el) => el.nome_area)
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
  async fetch({ store, $axios }) {
    const hasAlreadyFetched =
      store.getters['data/hasAlreadyFetchedSomministrations']

    let data = 'yop'
    if (!hasAlreadyFetched) {
      const url = store.getters['data/somministrationsUrl']

      try {
        data = await $axios.$get(url)
      } catch (err) {
        console.error(err)
      }

      store.dispatch('data/setSomministrationsData', data)
    } else {
      data = store.getters['data/somministrationsData']
    }
  },
  methods: {
    generateDataset(label, backgroundColor) {
      return {
        label,
        data: this.data.map((el) => el[label]),
        backgroundColor,
        orderWidth: 1,
      }
    },
    onRegionHover(hoveredRegion) {
      this.selectedRegion = hoveredRegion
    },
  },
  watch: {
    selectedRegion(value) {
      const data = this.$store.getters['data/somministrationsData']

      const regionObject = data.find((region) => region.nome_area === value)

      this.dosiSomministrate = regionObject.dosi_somministrate
    },
  },
})
</script>
