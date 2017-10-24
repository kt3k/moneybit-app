/**
 * Decorator which delays the execution of the method to the next tick.
 */
module.exports = (target, key, descriptor) => {
  const method = descriptor.value

  return {
    ...descriptor,
    value: function () {
      setTimeout(() => {
        method.apply(this, arguments)
      })
    }
  }
}
