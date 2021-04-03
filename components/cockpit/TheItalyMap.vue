<template>
  <div class="section is-flex is-flex-direction-column">
    <SvgMap
      :data="data"
      :paths="italyPath"
      :filterBy="filterBy"
      :elementIdentifier="elementIdentifier"
      :activeList="selectedRegions"
      :focusedElement="focusedRegion"
      @path-enter="onEnter"
      @path-leave="onLeave"
      @path-click="onClick"
    />
    <b-tag class="is-medium">
      <span v-if="percentage" c>
        <strong>{{ focusedRegion }}</strong
        >'s administrations: {{ percentage }}%
      </span>
    </b-tag>
  </div>
</template>

<script>
import Vue from 'vue'

import SvgMap from '~/components/charts/SvgMap'
import italyPath from '~/assets/svg/italy'

export default Vue.extend({
  name: 'the-italy-map',
  components: {
    SvgMap,
  },
  data() {
    return {
      italyPath,
      data: [],
    }
  },
  mounted() {
    this.data = this.$store.getters['somministrations/data']
    this.regions = this.data.map((region) => region.areaName)
    this.$store.dispatch('map/setRegions', this.regions)
    this.$store.dispatch('map/setSelectedRegions', this.regions)
  },
  computed: {
    selectedRegions() {
      return this.$store.getters['map/selectedRegions']
    },
    focusedRegion() {
      return this.$store.getters['map/focusedRegion']
    },
    filterBy() {
      return this.$store.getters['map/filterBy']
    },
    elementIdentifier() {
      return this.$store.getters['map/elementIdentifier']
    },
    percentage() {
      const index = this.selectedRegions.indexOf(this.focusedRegion)
      if (!~index) return

      return this.data[index].administrationPercentage
    },
  },
  methods: {
    onEnter(value) {
      this.$store.dispatch('map/setFocusedRegion', value)
    },
    onLeave() {
      this.$store.dispatch('map/setFocusedRegion', null)
    },
    onClick(value) {
      if (!value) return

      if (this.selectedRegions.includes(value)) {
        const filtered = this.selectedRegions.filter(
          (region) => region != value
        )
        this.$store.dispatch('map/setSelectedRegions', filtered)
      } else {
        const pushed = [...this.selectedRegions, value]
        this.$store.dispatch('map/setSelectedRegions', pushed)
      }
    },
  },
})
</script>
