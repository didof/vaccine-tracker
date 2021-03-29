<template>
  <div>
    <TheHeader />

    <div class="container is-fluid columns">
      <div class="column"><Nuxt /></div>
      <div class="column is-4 section">
        <RegionsSwitch /><ItalyMap /><TheRegionsTagList />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import TheHeader from '~/components/TheHeader'
import ItalyMap from '~/components/ItalyMap'
import RegionsSwitch from '~/components/RegionsSwitch'
import TheRegionsTagList from '~/components/TheRegionsTagList'

export default Vue.extend({
  name: 'layout-default',
  components: {
    TheHeader,
    ItalyMap,
    RegionsSwitch,
    TheRegionsTagList,
  },
})
</script>
