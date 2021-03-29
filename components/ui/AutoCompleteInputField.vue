<template>
  <section>
    <b-field :label="label">
      <b-autocomplete
        :placeholder="placeholder"
        rounded
        icon="magnify"
        clearable
        v-model="value"
        :data="filtered"
        @select="$emit('selected', $event)"
      >
        <template #empty>{{ empty }}</template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'auto-complete-input-field',
  emits: ['selected'],
  props: {
    label: {
      type: String,
      default: 'Search',
    },
    placeholder: {
      type: String,
      default: 'Type something...',
    },
    empty: {
      type: String,
      default: 'No results found',
    },
    allOptions: {
      type: Array,
      require: true,
    },
    notAvaiableOptions: {
      type: Array,
      defaukt: [],
    },
  },
  data() {
    return {
      value: '',
    }
  },
  computed: {
    avaiableOptions() {
      return this.allOptions.filter((option) => {
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
})
</script>
