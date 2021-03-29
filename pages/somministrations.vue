<template>
  <div class="section">
    <section class="columns">
      <div class="column is-12">
        <b-field grouped group-multiline>
          <RegionSwitch
            :watchItems="selectedRegions"
            :itemsLength="data.length"
            @change="onRegionSwitchChange"
          />
        </b-field>

        <TagList
          :items="selectedRegions"
          :focusedElement="focusedRegion"
          @tag-click="onTagClick"
          @tag-enter="onEnter"
          @tag-leave="onLeave"
        />

        <!-- <AutoCompleteInputField
          label="Search Region"
          placeholder="Type Italian region..."
          :allOptions="allRegions"
          :notAvaiableOptions="selectedRegions"
          @selected="onAddRegion"
        /> -->
      </div>
    </section>
    <section class="columns">
      <div class="column is-8">
        <BarChart :data="chartData" />
      </div>
      <div class="column is-4">
        <SvgMap
          :paths="italyPaths"
          :data="data"
          :filterBy="'dosi_somministrate'"
          :elementIdentifier="'nome_area'"
          :activeList="selectedRegions"
          :focusedElement="focusedRegion"
          @path-click="onAddRegion"
          @path-enter="onEnter"
          @path-leave="onLeave"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import BarChart from '~/components/charts/BarChart'

import italyPaths from '~/assets/svg/italy'
import SvgMap from '~/components/charts/SvgMap'

import TagList from '~/components/ui/TagList'
import RegionSwitch from '~/components/ui/switches/RegionSwitch'
import AutoCompleteInputField from '~/components/ui/AutoCompleteInputField'

export default Vue.extend({
  name: 'page-somministrations',
  components: {
    BarChart,
    SvgMap,
    TagList,
    RegionSwitch,
    AutoCompleteInputField,
  },
  data() {
    return {
      italyPaths,
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
    onRegionSwitchChange(value) {
      if (value) {
        this.selectedRegions = this.data.map((region) => region.nome_area)
      } else {
        const snapshot = this.selectedRegions
        this.selectedRegions = []
        this.$buefy.snackbar.open({
          message: 'All regions deselected',
          type: 'is-info',
          position: 'is-bottom-left',
          actionText: 'undo',
          duration: 3000,
          onAction: () => {
            this.selectedRegions = snapshot
            this.$buefy.toast.open({
              message: 'Regions restored',
              queue: false,
            })
          },
        })
      }
    },
  },
})
</script>
