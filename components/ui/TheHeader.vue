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
        <ColorModeSwitch />
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Vue from 'vue'

import ColorModeSwitch from '~/components/ColorModeSwitch'

export default Vue.extend({
  name: 'the-header',
  components: {
    ColorModeSwitch,
  },
})
</script>
