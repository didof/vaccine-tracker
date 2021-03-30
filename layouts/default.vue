<template>
  <div>
    <!-- <TheHeader /> -->

    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import TheHeader from '~/components/TheHeader'

export default Vue.extend({
  name: 'layout-default',
  components: {
    TheHeader,
  },
})
</script>
