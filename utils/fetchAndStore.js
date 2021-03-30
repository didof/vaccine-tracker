import administrationsMock from './mocks/administrations'
import somministrationsMock from './mocks/somministrations'

const fetchAndStore = async (label, { store, $axios }) => {
  console.log('[fetchAndStore] ', label)

  const hasAlreadyFetched = store.getters[`${label}/hasAlreadyFetched`]

  let data
  if (!hasAlreadyFetched) {
    const url = store.getters[`${label}/url`]

    switch (label) {
      case 'administrations':
        console.log('[mock] administrations')
        data = administrationsMock
        break
      case 'somministrations':
        console.log('[mock] somministrations')
        data = somministrationsMock
        break
      default:
        data = await $axios.$get(url)
    }

    store.dispatch(`${label}/setData`, data)
  } else {
    data = store.getters[`${label}/data`]
  }

  return data
}

export default fetchAndStore
