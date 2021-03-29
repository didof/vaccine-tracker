<template>
  <div>
    <TheHeader />

    <div class="container is-fluid columns">
      <div class="column"><Nuxt /></div>
      <div class="column is-4 section">
        <RegionsSwitch /><TheItalyMap /><TheRegionsTagList /><TheAutoCompleteRegionsInputField />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import TheHeader from '~/components/TheHeader'
import TheItalyMap from '~/components/TheItalyMap'
import RegionsSwitch from '~/components/RegionsSwitch'
import TheRegionsTagList from '~/components/TheRegionsTagList'
import TheAutoCompleteRegionsInputField from '~/components/TheAutoCompleteRegionsInputField'

export default Vue.extend({
  name: 'layout-default',
  components: {
    TheHeader,
    TheItalyMap,
    RegionsSwitch,
    TheRegionsTagList,
    TheAutoCompleteRegionsInputField,
  },
})
</script>
