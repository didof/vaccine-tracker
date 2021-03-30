const filterFields = (original, config) => {
  return original.map((element) => {
    return Object.keys(element).reduce((accumulator, current) => {
      if (config.includes(current)) {
        accumulator[current] = element[current]
      }

      return accumulator
    }, {})
  })
}

export default filterFields
