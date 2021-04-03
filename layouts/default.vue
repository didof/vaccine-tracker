<template>
  <div class="section">
    <Nuxt />
    <b-modal v-model="isModalActive" :can-cancel="false">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="image" alt="busy boy" />
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            This demo was built to be usable on devices with a screen at least
            772 px wide.
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'layout-default',
  data() {
    return {
      isModalActive: false,
      image: require('~/assets/busy.jpg'),
    }
  },
  mounted() {
    if (window.innerWidth <= 772) {
      this.isModalActive = true
    }
  },
})
</script>
