import filterFields from '~/utils/filterFields'
import aggregateBy from '~/utils/aggregateBy'
import renameProperties from '~/utils/renameProperties'
import renameKeys from '~/utils/renameKeys'
import mergeKeys from '~/utils/mergeKeys'

export default {
  setData({ commit }, payload) {
    delete payload.schema

    const filtered = filterFields(payload.data, [
      'provincia',
      'presidio_ospedaliero',
      'nome_area',
    ])

    const aggregated = aggregateBy(filtered, 'nome_area')

    const renamed = renameProperties(aggregated, {
      provincia: 'province',
      presidio_ospedaliero: 'hospitalUnit',
    })

    const changed = renameKeys(
      renamed,
      "Valle d'Aosta / Vallée d'Aoste",
      "Valle d'Aosta"
    )

    const merged = mergeKeys(changed, 'Trentino-Alto Adige', [
      'Provincia Autonoma Trento',
      'Provincia Autonoma Bolzano / Bozen',
    ])

    commit('setData', merged)
  },
  setFetchDate({ commit }, payload) {},
}
