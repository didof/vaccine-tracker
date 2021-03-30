<template>
  <BaseAccordion :items="administrations" :activeList="selectedRegions" />
</template>

<script>
import Vue from 'vue'

import BaseAccordion from '~/components/ui/BaseAccordion'

export default Vue.extend({
  name: 'the-administrations-table',
  components: {
    BaseAccordion,
  },
  computed: {
    administrations() {
      return this.$store.getters['administrations/data']
    },
    selectedRegions() {
      return this.$store.getters['map/selectedRegions']
    },
  },
})
</script>
