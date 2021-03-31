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
  ageGroups(state) {
    return state.data.map((element) => element.ageGroups)
  },
  selected(state) {
    return state.selectedOption
  },
  selectedOption(state, getters) {
    return state.options[getters.selected]
  },
  selectedData(state, getters) {
    return state.data.reduce((accumulator, current) => {
      accumulator[current.ageGroups] = getters.selectedOption.reduce(
        (acc, cur) => {
          acc[cur] = current[cur]
          return acc
        },
        {}
      )
      return accumulator
    }, {})
  },
  selectedColors(state, getters) {
    return state.colors[getters.selected]
  },
}
