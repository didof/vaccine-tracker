<script>
import Vue from 'vue'
import { Bar } from 'vue-chartjs'
export default Vue.extend({
  name: 'bar-chart',
  extends: Bar,
  props: {
    labels: {
      type: Array,
      required: true,
    },
    datasets: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    const { labels, datasets } = this.$props

    this.renderChart({
      labels,
      datasets,
    })
  },
})
</script>
