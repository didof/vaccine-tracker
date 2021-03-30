const aggregateBy = (original, key) => {
  return original.reduce((accumulator, current) => {
    const identifier = current[key]

    const slimmedCurrent = Object.keys(current).reduce((slimmed, k) => {
      if (k !== key) slimmed[k] = current[k]
      return slimmed
    }, {})

    if (!accumulator[identifier]) {
      accumulator[identifier] = [slimmedCurrent]
    } else {
      accumulator[identifier].push(slimmedCurrent)
    }

    return accumulator
  }, {})
}

export default aggregateBy
