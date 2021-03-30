<template>
  <BaseAccordion
    :items="administrations"
    :activeList="selectedRegions"
    :focusedItem="focusedElement"
    @element-enter="onEnter"
    @element-leave="onLeave"
  >
    <template v-slot:default="slotProps">
      <div>{{ slotProps }}</div>
    </template>
  </BaseAccordion>
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
    focusedElement() {
      return this.$store.getters['map/focusedRegion']
    },
  },
  methods: {
    onEnter(value) {
      this.$store.dispatch('map/setFocusedRegion', value)
    },
    onLeave() {
      this.$store.dispatch('map/setFocusedRegion', null)
    },
  },
})
</script>
