<template>
  <div>
    <TheHeader />

    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import TheHeader from '~/components/ui/TheHeader'

export default Vue.extend({
  name: 'layout-default',
  components: {
    TheHeader,
  },
  methods: {
    redirectTo(url) {
      this.$router.push(url)
    },
  },
})
</script>
