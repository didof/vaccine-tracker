export default {
  url(state) {
    return state.url
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
