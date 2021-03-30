const fetchAndStore = async (label, { store, $axios }) => {
  const hasAlreadyFetched = store.getters[`${label}/hasAlreadyFetched`]

  let data
  if (!hasAlreadyFetched) {
    const url = store.getters[`${label}/url`]

    data = await $axios.$get(url)

    store.dispatch(`${label}/setData`, data)
  } else {
    data = store.getters[`${label}/data`]
  }
}

export default fetchAndStore
