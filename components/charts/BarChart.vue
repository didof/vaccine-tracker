<script>
import Vue from 'vue'
import { Bar } from 'vue-chartjs'
export default Vue.extend({
  name: 'bar-chart',
  extends: Bar,
  props: ['data'],
  data() {
    return {
      options: { responsive: true, maintainAspectRatio: false },
    }
  },
  computed: {
    chartData() {
      return this.data
    },
  },
  mounted() {
    this.render()
  },
  watch: {
    data() {
      this.$data._chart.destroy()
      this.render()
    },
  },
  methods: {
    render() {
      this.renderChart(this.chartData, this.options)
    },
  },
})
</script>
