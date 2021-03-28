<template>
  <section class="section">
    <h1 class="title">testing</h1>

    <br />
    <br />
    <section class="columns">
      <div class="column is-4">
        <BarChart :labels="barChartLabels" :datasets="barChartDatasets" />
      </div>
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
import BarChart from '~/components/charts/BarChart'

export default Vue.extend({
  name: 'page-home',
  components: {
    BarChart,
  },
  mounted() {
    const test = this.$store.getters['urls/somministration']
  },
  async asyncData() {},
  computed: {
    barChartLabels() {
      return ['1', '2', '3']
    },
    barChartDatasets() {
      return [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ]
    },
  },
})
</script>
