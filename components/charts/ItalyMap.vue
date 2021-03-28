<template>
  <div>
    <img :src="italySrc" />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'italy-map',
  computed: {
    italySrc() {
      return require('~/assets/svg/italy.svg')
    },
  },
})
</script>

<style scoped>
img {
  min-height: 750px;
  min-width: 650px;
}
</style>
