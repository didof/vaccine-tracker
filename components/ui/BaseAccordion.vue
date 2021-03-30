<template>
  <section>
    <b-collapse
      class="card"
      animation="slide"
      v-for="(item, index) of activeItems"
      :key="index"
      :open="openIndex == index"
      @open="onMouseClick(index)"
    >
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
          @mouseover="onMouseEnter(index, item.title)"
          @mouseleave="onMouseLeave"
        >
          <p
            class="card-header-title"
            :style="getHeaderStyle(index, item.title)"
          >
            {{ item.title }}
          </p>
          <span class="is-flex" v-if="index == hoverIndex">
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"> </b-icon>
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

      <slot v-bind="item"></slot>
    </b-collapse>
  </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'base-accordion',
  emits: ['element-enter', 'element-leave', 'element-delete'],
  props: {
    items: {
      type: Object,
      require: true,
    },
    activeList: {
      type: Array,
      require: true,
    },
    focusedItem: {
      type: String,
      require: true,
    },
  },
  computed: {
    activeItems() {
      return Object.keys(this.items)
        .filter((element) => this.activeList.includes(element))
        .map((title) => ({ ...this.items[title], title }))
    },
  },
  data() {
    return {
      openIndex: null,
      hoverIndex: null,
    }
  },
  methods: {
    onMouseClick(index) {
      this.openIndex = null
      setTimeout(() => {
        this.openIndex = index
      }, 500)
    },
    onMouseEnter(index, title) {
      this.hoverIndex = index
      this.$emit('element-enter', title)
    },
    onMouseLeave() {
      this.hoverIndex = null
      this.$emit('element-leave')
    },
    getHeaderStyle(index, title) {
      return {
        color:
          index === this.openIndex || title === this.focusedItem
            ? 'green'
            : 'black',
      }
    },
    getIconStyle(isOpen) {},
  },
})
</script>
