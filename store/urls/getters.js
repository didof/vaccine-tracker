const base =
  'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/'
const ext = '.json'

const embedInTargetUrl = (input) => {
  return base + input + ext
}

export default {
  somministration(state) {
    return embedInTargetUrl(state.somministration)
  },
}
