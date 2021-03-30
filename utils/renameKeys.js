const renameKeys = (original, target, replacement) => {
  const snapshot = { ...original[target] }
  delete original[target]

  original[replacement] = snapshot

  return original
}

export default renameKeys
