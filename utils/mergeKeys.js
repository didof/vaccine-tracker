const mergeKeys = (original, name, keys) => {
  const snapshots = keys.map((key) => original[key])

  keys.forEach((key) => {
    delete original[key]
  })

  original[name] = snapshots.reduce((accumulator, snapshot) => {
    accumulator = [...accumulator, ...snapshot]
    return accumulator
  }, [])

  return original
}

export default mergeKeys
