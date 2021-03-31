import filterFields from '~/utils/filterFields'
import renameProperties from '~/utils/renameProperties'

export default {
  setData({ commit }, payload) {
    delete payload.schema

    const filtered = filterFields(payload.data, [
      'fascia_anagrafica',
      'prima_dose',
      'seconda_dose',
      'sesso_maschile',
      'sesso_femminile',
      'categoria_operatori_sanitari_sociosanitari',
      'categoria_personale_non_sanitario',
      'categoria_altro',
      'categoria_ospiti_rsa',
      'categoria_over80',
      'categoria_forze_armate',
      'categoria_personale_scolastico',
    ])

    const renamed = renameProperties(filtered, {
      fascia_anagrafica: 'ageGroups',
      prima_dose: 'firstDose',
      seconda_dose: 'secondDose',
      sesso_maschile: 'maleGender',
      sesso_femminile: 'femaleGender',
      categoria_operatori_sanitari_sociosanitari: 'socioHealthWorkers',
      categoria_personale_non_sanitario: 'notMedicalPersonnel',
      categoria_altro: 'other',
      categoria_ospiti_rsa: 'rsaGuests',
      categoria_over80: 'over80',
      categoria_forze_armate: 'armedForces',
      categoria_personale_scolastico: 'schoolStaff',
    })

    commit('setData', renamed)
  },
  setFetchDate({ commit }, payload) {},
}
