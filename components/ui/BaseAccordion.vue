<template>
  <section>
    <b-collapse
      class="card"
      animation="slide"
      v-for="(item, i) of activeItems"
      :key="i"
      :open="index == i"
      @open="index = i"
    >
      <template #trigger="props">
        <div class="card-header" role="button">
          <p class="card-header-title">
            {{ item.title }}
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div class="content">{{ item }}</div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'base-accordion',
  props: {
    items: {
      type: Object,
      require: true,
    },
    activeList: {
      type: Array,
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
      index: null,
    }
  },
})
</script>
