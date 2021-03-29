<template>
  <div>
    <TheHeader />

    <div class="container is-fluid columns">
      <div class="column"><Nuxt /></div>
      <div class="column is-4"><ItalyMap /></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import TheHeader from '~/components/ui/TheHeader'
import ItalyMap from '~/components/ItalyMap'

export default Vue.extend({
  name: 'layout-default',
  components: {
    TheHeader,
  },
})
</script>
