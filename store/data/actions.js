export default {
  setSomministrationsData({ commit }, payload) {
    // TODO: slim data

    delete payload.schema

    const FIELDS = [
      'index',
      'dosi_somministrate',
      'dosi_consegnate',
      'percentuale_somministrazione',
      'nome_area',
    ]

    const filtered = payload.data.map((element) => {
      return Object.keys(element).reduce((accumulator, current) => {
        if (FIELDS.includes(current)) {
          accumulator[current] = element[current]
        }

        return accumulator
      }, {})
    })

    commit('setSomministrationsData', filtered)
  },
  setSomministrationsFetchDate({ commit }, payload) {
    // TODO: format date
    commit('setSomministrationsFetchDate', payload)
  },
}
