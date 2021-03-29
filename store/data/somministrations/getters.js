const base =
  'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/'
const ext = '.json'

const embedInTargetUrl = (input) => {
  return base + input + ext
}

export default {
  url(state) {
    return embedInTargetUrl(state.url)
  },
  hasAlreadyFetched(state) {
    return Boolean(state.fetchDate)
  },
  data(state) {
    return state.data
  },
  fetchDate(state) {
    return state.fetchDate
  },
}
