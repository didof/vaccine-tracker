<template>
  <div :id="svgId" class="svg-container"></div>
</template>

<script>
import Vue from 'vue'

import italyMap from '~/assets/svg/italy'

export default Vue.extend({
  name: 'italy-map',
  data() {
    return {
      svgId: 'italyMap',
      mapAttr: {
        viewBoxWidth: 900,
        viewBoxHeight: 800,
      },
      svgContainer: null,
    }
  },
  mounted() {
    this.generateVenueMap()
  },
  methods: {
    generateVenueMap() {
      const somministrationData = this.$store.getters[
        'data/somministrationsData'
      ]

      const mapData = italyMap.g.path
      const svgContainer = this.$svg('italyMap')
        .size('100%', '100%')
        .viewbox(-200, 0, this.mapAttr.viewBoxWidth, this.mapAttr.viewBoxHeight)
      console.log(svgContainer)
      this.svgContainer = svgContainer
      mapData.forEach((pathObj) => {
        const percentage =
          Math.floor(
            somministrationData.find((region) =>
              region.nome_area.startsWith(pathObj['-title'])
            )?.percentuale_somministrazione
          ) / 100

        console.log(pathObj['-title'], percentage)

        this.generatePath(svgContainer, pathObj, percentage)
      })
    },
    generatePath: function (svgCont, pathObj, percentage) {
      const vue = this

      const attrs = {
        fill: `rgba(0, 0, 255, ${percentage})`,
        stroke: 'white',
        'stroke-width': 2,
        title: pathObj['-title'],
        'map-id': pathObj['-id'],
      }
      const element = svgCont.path(pathObj['-d']).attr(attrs)
      element.click(function () {
        const mapId = this.node.attributes['map-id'].value
        const title = this.node.attributes['title'].value
        console.log(title)
        vue.$emit('map-clicked', { mapId, title })
      })
    },
  },
})
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
