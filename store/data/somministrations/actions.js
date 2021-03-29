export default {
  setData({ commit }, payload) {
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

    const valleDAostaIndex = filtered.findIndex(
      (region) => region.nome_area === "Valle d'Aosta / Vallée d'Aoste"
    )

    filtered[valleDAostaIndex].nome_area = "Valle d'Aosta"

    const trentoIndex = filtered.findIndex(
      (region) => region.nome_area === 'Provincia Autonoma Trento'
    )
    const bolzanoIndex = filtered.findIndex(
      (region) => region.nome_area === 'Provincia Autonoma Bolzano / Bozen'
    )

    const trento = filtered[trentoIndex]
    const bolzano = filtered[bolzanoIndex]

    const trentinoAltoAdige = Object.keys(trento).reduce((merged, key) => {
      switch (key) {
        case 'index':
          merged.index = 21
          break
        case 'dosi_somministrate':
        case 'dosi_consegnate':
          merged[key] += bolzano[key]
          break
        case 'percentuale_somministrazione':
          break
        case 'nome_area':
          merged[key] = 'Trentino-Alto Adige'
      }
      return merged
    }, trento)

    filtered.splice(trentoIndex, 1)
    filtered.splice(bolzanoIndex, 1)
    filtered.push(trentinoAltoAdige)

    commit('setData', filtered)
  },
  setFetchDate({ commit }, payload) {
    // TODO: format date
    commit('setFetchDate', payload)
  },
}
