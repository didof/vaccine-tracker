<template>
  <div class="section">
    <section class="columns">
      <div class="column is-12">
        <TagList
          :items="selectedRegions"
          :focusedElement="focusedRegion"
          @tag-click="onTagClick"
          @tag-enter="onEnter"
          @tag-leave="onLeave"
        />

        <AutoCompleteInputField
          label="Search Region"
          placeholder="Type Italian region..."
          :allOptions="allRegions"
          :notAvaiableOptions="selectedRegions"
          @selected="onAddRegion"
        />
      </div>
    </section>
    <BarChart :data="chartData" />
  </div>
</template>

<script>
import Vue from 'vue'
import BarChart from '~/components/charts/BarChart'

import TagList from '~/components/ui/TagList'
import RegionSwitch from '~/components/ui/switches/RegionSwitch'
import AutoCompleteInputField from '~/components/ui/AutoCompleteInputField'

export default Vue.extend({
  name: 'page-somministrations',
  components: {
    BarChart,
    TagList,
    RegionSwitch,
    AutoCompleteInputField,
  },
  data() {
    return {
      data: [],
      selectedRegions: [],
      allRegions: null,
      focusedRegion: null,
    }
  },
  created() {
    this.data = this.$store.getters['somministrations/data']
    this.selectedRegions = this.data.map((region) => region.nome_area)
    this.allRegions = this.selectedRegions
  },
  computed: {
    chartData() {
      return {
        labels: this.selectedRegions,
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
  methods: {
    generateDataset(label, backgroundColor) {
      const selectedData = this.data.filter((region) =>
        this.selectedRegions.includes(region.nome_area)
      )

      return {
        label,
        data: selectedData.map((el) => el[label]),
        backgroundColor,
        orderWidth: 4,
      }
    },
    onAddRegion(value) {
      if (!value) return
      if (this.selectedRegions.includes(value)) {
        this.selectedRegions = this.selectedRegions.filter(
          (region) => region !== value
        )
      } else {
        this.selectedRegions.push(value)
      }
    },
    onEnter(value) {
      this.focusedRegion = value
    },
    onLeave() {
      this.focusedRegion = null
    },
    onTagClick(value) {
      this.selectedRegions = this.selectedRegions.filter(
        (region) => region !== value
      )
    },
  },
})
</script>
