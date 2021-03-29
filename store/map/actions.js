export default {
  setRegions({ commit }, payload) {
    commit('setRegions', payload)
  },
  setSelectedRegions({ commit }, payload) {
    commit('setSelectedRegions', payload)
  },
  setFocusedRegion({ commit }, payload) {
    commit('setFocusedRegion', payload)
  },
}
