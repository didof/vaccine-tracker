<template>
  <div>
    <BarChart :labels="labels" :datasets="datasets" />
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
import Vue from 'vue'
import BarChart from '~/components/charts/BarChart'

export default Vue.extend({
  name: 'page-somministrations',
  components: {
    BarChart,
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
