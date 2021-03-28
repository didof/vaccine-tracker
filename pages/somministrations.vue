<template>
  <section class="columns">
    <div class="column is-8">
      <BarChart :labels="labels" :datasets="datasets" />
    </div>
    <div class="column is-4">
      <ItalyMap />
    </div>
    <!-- <pre>{{ data }}</pre> -->
  </section>
</template>

<script>
import Vue from 'vue'
import BarChart from '~/components/charts/BarChart'
import ItalyMap from '~/components/charts/ItalyMap'

export default Vue.extend({
  name: 'page-somministrations',
  components: {
    BarChart,
    ItalyMap,
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
  },
})
</script>
