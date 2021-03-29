<template>
  <div></div>
  <!-- <SvgMap
    :paths="italyPaths"
    :data="data"
    :filterBy="'dosi_somministrate'"
    :elementIdentifier="'nome_area'"
    :activeList="selectedRegions"
    :focusedElement="focusedRegion"
    @path-click="onAddRegion"
    @path-enter="onEnter"
    @path-leave="onLeave"
  /> -->
</template>

<script>
import Vue from 'vue'

import italyPaths from '~/assets/svg/italy'

export default Vue.extend({
  name: 'the-italian-map',
  data() {
    return {
      italyPaths,
      data: [],
    }
  },
})
</script>
