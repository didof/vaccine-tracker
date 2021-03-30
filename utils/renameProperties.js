const renameProperties = (original, config) => {
  const renameElementProperties = (element) => {
    return Object.keys(element).reduce((accumulator, key) => {
      let newKey = config[key]
      if (!newKey) newKey = key
      accumulator[newKey] = element[key]
      return accumulator
    }, {})
  }

  if (Array.isArray(original)) {
    return original.map(renameElementProperties)
  } else {
    return Object.keys(original).reduce((accumulator, current) => {
      const renamed = original[current].map(renameElementProperties)

      accumulator[current] = renamed

      return accumulator
    }, {})
  }
}

export default renameProperties
