<template>
  <b-field label="Selected Regions">
    <b-taglist>
      <span
        class="tag is-large"
        :class="getClass(tag)"
        v-for="tag in items"
        :key="tag"
        @click="$emit('tag-click', tag)"
        @mouseenter="$emit('tag-enter', tag)"
        @mouseleave="$emit('tag-leave')"
        >{{ tag }}</span
      >
    </b-taglist>
  </b-field>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'tag-list',
  emits: ['tag-click', 'tag-enter', 'tag-leave'],
  props: {
    items: {
      type: Array,
      require: true,
    },
    focusedElement: {
      type: String,
      require: false,
    },
  },
  methods: {
    getClass(tag) {
      return tag === this.focusedElement ? 'is-success' : 'is-link is-light'
    },
  },
})
</script>

<style scoped>
span {
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.2s ease-in-out 0.1s;
}
</style>
