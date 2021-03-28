<template>
  <div>
    <template>
      <b-navbar shadow spaced centered>
        <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            Brand
          </b-navbar-item>
        </template>
        <template #start>
          <b-navbar-item @click="redirectTo('/')"> Home </b-navbar-item>
          <b-navbar-item @click="redirectTo('/somministrations')"
            >Somministrations
          </b-navbar-item>
          <b-navbar-dropdown label="Info">
            <b-navbar-item> About </b-navbar-item>
            <b-navbar-item> Contact </b-navbar-item>
          </b-navbar-dropdown>
        </template>

        <template #end>
          <b-navbar-item tag="div">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light"> Log in </a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </template>

    <div
      class="section is-flex is-flex-direction-row is-justify-content-flex-end is-align-content-center"
    >
      <ColorModeSwitch />
    </div>

    <div class="container column is-10">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ColorModeSwitch from '~/components/ColorModeSwitch'

export default Vue.extend({
  name: 'layout-default',
  components: {
    ColorModeSwitch,
  },
  methods: {
    redirectTo(url) {
      this.$router.push(url)
    },
  },
})
</script>
