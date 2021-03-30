const renameProperties = (original, config) => {
  return original.map((element) => {
    return Object.keys(element).reduce((accumulator, key) => {
      let newKey = config[key]
      if (!newKey) newKey = key
      accumulator[newKey] = element[key]
      return accumulator
    }, {})
  })
}

export default renameProperties
