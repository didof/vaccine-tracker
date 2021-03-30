const searchAndUpdate = (original, [key, value], cb) => {
  const index = original.findIndex(cb)
  original[index][key] = value
}

export default searchAndUpdate
