<template>
  <section>
    <b-collapse
      v-for="(item, index) of activeItems"
      class="panel"
      :class="getHeaderClass(item.title)"
      :key="index"
      :open="openIndex == index"
      @open="onMouseClick(index)"
      animation="slide"
    >
      <template #trigger="props">
        <BaseAccordionHeader
          :item="item"
          :open="props.open"
          :isActive="index === openIndex || item.title === focusedItem"
          @element-enter="$emit('element-enter', $event)"
          @element-leave="$emit('element-leave')"
          @element-delete="onDelete"
        />
      </template>

      <slot v-bind="item"></slot>
    </b-collapse>
  </section>
</template>

<script>
import Vue from 'vue'

import BaseAccordionHeader from '~/components/ui/BaseAccordionHeader'

export default Vue.extend({
  name: 'base-accordion',
  emits: ['element-enter', 'element-leave', 'element-delete'],
  components: {
    BaseAccordionHeader,
  },
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
    tagsIdentifier: {
      type: String,
      require: true,
    },
  },
  computed: {
    activeItems() {
      return Object.keys(this.items)
        .filter((element) => this.activeList.includes(element))
        .map((title) => ({
          ...this.items[title],
          title,
        }))
    },
    focusedElement() {
      return this.$store.getters['map/focusedRegion']
    },
  },
  data() {
    return {
      openIndex: null,
    }
  },
  methods: {
    onMouseClick(index) {
      this.openIndex = null
      setTimeout(() => {
        this.openIndex = index
      }, 500)
    },
    onDelete(title) {
      this.$emit('element-delete', title)
      this.openIndex = null
    },
    getHeaderClass(title) {
      return {
        'is-success':
          this.focusedItem === title || this.focusedElement === title,
      }
    },
  },
})
</script>
