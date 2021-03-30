import filterFields from '~/utils/filterFields'
import renameProperties from '~/utils/renameProperties'
import searchAndUpdate from '~/utils/searchAndUpdate'
import searchInArray from '~/utils/searchInArray'

export default {
  setData({ commit }, payload) {
    delete payload.schema

    const filtered = filterFields(payload.data, [
      'index',
      'dosi_somministrate',
      'dosi_consegnate',
      'percentuale_somministrazione',
      'nome_area',
    ])

    const renamed = renameProperties(filtered, {
      dosi_somministrate: 'dosesAdministered',
      dosi_consegnate: 'deliveredDoses',
      percentuale_somministrazione: 'administrationPercentage',
      nome_area: 'areaName',
    })

    searchAndUpdate(
      renamed,
      ['areaName', "Valle d'Aosta"],
      (element) => element.areaName === "Valle d'Aosta / Vallée d'Aoste"
    )

    const [trento, bolzano] = searchInArray(renamed, [
      (element) => element.areaName === 'Provincia Autonoma Trento',
      (element) => element.areaName === 'Provincia Autonoma Bolzano / Bozen',
    ])

    const trentinoAltoAdige = Object.keys(trento.value).reduce(
      (merged, key) => {
        switch (key) {
          case 'index':
            merged.index = 21
            break
          case 'dosesAdministered':
          case 'deliveredDoses':
            merged[key] += bolzano.value[key]
            break
          case 'administrationPercentage':
            break
          case 'areaName':
            merged[key] = 'Trentino-Alto Adige'
        }
        return merged
      },
      trento.value
    )

    renamed.splice(trento.index, 1)
    renamed.splice(bolzano.index, 1)
    renamed.push(trentinoAltoAdige)

    commit('setData', renamed)
  },
  setFetchDate({ commit }, payload) {
    // TODO: format date
    commit('setFetchDate', payload)
  },
}
