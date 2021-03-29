export default {
  setRegions(state, payload) {
    state.regions = payload
  },
  setSelectedRegions(state, payload) {
    state.selectedRegions = payload
  },
  setFocusedRegion(state, payload) {
    state.focusedRegion = payload
  },
}
