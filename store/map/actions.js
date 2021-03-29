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
  fullSelectedRegions({ commit }) {
    commit('fullSelectedRegions')
  },
  emptySelectedRegions({ commit }) {
    commit('emptySelectedRegions')
  },
}
