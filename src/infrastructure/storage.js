/**
 * Gets the value of the key.
 * @param {string} key The key
 * @param {object} defaultValue The default value
 * @return {Promise<object>}
 */
exports.get = (key, defaultValue) => {
  const value = window.localStorage.getItem(key)

  return Promise.resolve(value != null ? JSON.parse(value) : defaultValue)
}

/**
 * Sets the value to the key.
 * @param {string} ket The key
 * @param {object} value The value to set
 * @return {Promise}
 */
exports.set = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))

  return Promise.resolve()
}
