const base =
  'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/'
const ext = '.json'

const embedInTargetUrl = (input) => {
  return base + input + ext
}

export default {
  somministrationsUrl(state) {
    return embedInTargetUrl(state.somministrationsUrl)
  },
  hasAlreadyFetchedSomministrations(state) {
    return Boolean(state.somministrationsFetchDate)
  },
  somministrationsData(state) {
    return state.somministrationsData
  },
  somministrationsFetchDate(state) {
    return state.somministrationsFetchDate
  },
}
