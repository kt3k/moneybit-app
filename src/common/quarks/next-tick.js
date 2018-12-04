/**
 * Decorator which delays the execution of the method to the next tick.
 */
module.exports = descriptor => {
  const method = descriptor.descriptor.value

  descriptor.descriptor.value = function () {
    setTimeout(() => {
      method.apply(this, arguments)
    })
  }
}
