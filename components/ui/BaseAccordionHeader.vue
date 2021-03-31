<template>
  <div
    class="panel-heading is-flex is-justify-content-space-between is-align-content-center"
    role="button"
    @mouseover="onEnter"
    @mouseleave="onLeave"
  >
    <p>
      {{ item.title }}
    </p>
    <span class="is-flex" v-if="isHover || isActive">
      <b-icon :icon="open ? 'menu-up' : 'menu-down'" style="margin-right: 1rem">
      </b-icon>
      <button
        class="delete"
        @click.stop="$emit('element-delete', item.title)"
      ></button>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'base-accordion-header',
  emits: ['element-enter', 'element-leave', 'element-delete'],
  props: {
    open: {
      type: Boolean,
      require: true,
    },
    item: {
      type: Object,
      require: true,
    },
    isActive: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      isHover: false,
    }
  },
  methods: {
    onEnter() {
      this.$emit('element-enter', this.item.title)
      this.isHover = true
    },
    onLeave() {
      this.$emit('element-leave')
      this.isHover = false
    },
  },
})
</script>

<style scoped>
.panel-heading {
  transition: background-color 0.3s ease-in-out 0.1s;
}
</style>
