<template>
  <section>
    <b-field label="Search">
      <b-autocomplete
        placeholder="Type something..."
        rounded
        icon="magnify"
        clearable
        v-model="value"
        :data="filtered"
        @select="onSelect($event)"
      >
        <template #empty>No results found</template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'the-auto-complete-regions-input-field',
  data() {
    return {
      value: '',
    }
  },
  computed: {
    allRegions() {
      return this.$store.getters['map/regions']
    },
    notAvaiableOptions() {
      return this.$store.getters['map/selectedRegions']
    },
    avaiableOptions() {
      return this.allRegions.filter((option) => {
        return !this.notAvaiableOptions.includes(option)
      })
    },
    filtered() {
      return this.avaiableOptions.filter((option) => {
        return (
          option.toString().toLowerCase().indexOf(this.value.toLowerCase()) >= 0
        )
      })
    },
  },
  methods: {
    onSelect(value) {
      const updated = [...this.notAvaiableOptions, value]
      this.$store.dispatch('map/setSelectedRegions', updated)
      this.value = ''
    },
  },
})
</script>
