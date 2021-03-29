<template>
  <div>
    <TheHeader />

    <div class="container is-fluid columns">
      <div class="column"><Nuxt /></div>
      <div class="column is-4"><RegionsSwitch /><ItalyMap /></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import TheHeader from '~/components/ui/TheHeader'
import ItalyMap from '~/components/ItalyMap'
import RegionsSwitch from '~/components/RegionsSwitch'

export default Vue.extend({
  name: 'layout-default',
  components: {
    TheHeader,
    ItalyMap,
    RegionsSwitch,
  },
})
</script>
