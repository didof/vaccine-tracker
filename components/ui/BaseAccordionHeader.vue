<template>
  <div
    class="card-header"
    role="button"
    @mouseover="onEnter"
    @mouseleave="onLeave"
  >
    <div
      class="card-header-title is-flex is-justify-content-space-between is-align-content-center"
      :style="headerStyle"
    >
      <p class="subtitle">
        {{ item.title }}
      </p>
      <b-taglist v-if="isHover">
        <span class="tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
      </b-taglist>
    </div>
    <span class="is-flex" v-if="isHover">
      <a class="card-header-icon">
        <b-icon :icon="open ? 'menu-up' : 'menu-down'"> </b-icon>
      </a>
      <a
        class="card-header-icon"
        @click.stop="$emit('element-delete', item.title)"
      >
        <button class="delete"></button>
      </a>
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
    tagsIdentifier: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      isHover: false,
    }
  },
  computed: {
    headerStyle() {
      return this.isActive ? 'green' : 'black'
    },
    onlyItems() {
      return Object.keys(this.item)
        .filter((key) => !isNaN(key))
        .map((index) => this.item[index])
    },
    tags() {
      const redundantTags = this.onlyItems.map(
        (element) => element[this.tagsIdentifier]
      )
      return new Set(redundantTags)
    },
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
