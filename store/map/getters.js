export default {
  regions(state) {
    return state.regions
  },
  regionsAmount(state) {
    return state.regions.length
  },
  selectedRegions(state) {
    return state.selectedRegions
  },
  focusedRegion(state) {
    return state.focusedRegion
  },
  filterBy(state) {
    return state.filterBy
  },
  elementIdentifier(state) {
    return state.elementIdentifier
  },
}
