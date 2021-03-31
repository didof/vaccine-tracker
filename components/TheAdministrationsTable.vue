<template>
  <BaseAccordion
    :items="administrations"
    :activeList="selectedRegions"
    :focusedItem="focusedElement"
    tagsIdentifier="province"
    @element-enter="onEnter"
    @element-leave="onLeave"
    @element-delete="onDelete"
  >
    <template v-slot:default="slotProps">
      <BaseTable :data="Object.values(slotProps)" />
    </template>
  </BaseAccordion>
</template>

<script>
import Vue from 'vue'

import BaseAccordion from '~/components/ui/BaseAccordion'
import BaseTable from '~/components/ui/BaseTable'

export default Vue.extend({
  name: 'the-administrations-table',
  components: {
    BaseAccordion,
    BaseTable,
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
    onDelete(value) {
      const filtered = this.selectedRegions.filter((region) => region !== value)
      this.$store.dispatch('map/setSelectedRegions', filtered)
    },
  },
})
</script>
