const searchInArray = (original, cbs) => {
  const founds = []
  cbs.forEach((cb) => {
    const index = original.findIndex(cb)
    founds.push({ index, value: original[index] })
  })

  return founds
}

export default searchInArray
