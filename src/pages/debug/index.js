/* global copy */

console.log('__DEBUG_MODE__')

const menu = require('chrome-console-debug-menu')
const { resetLocalStorage, serializeLocalStorage } = menu

global.m = menu.create('m', {
  ls: {
    description: 'localStorage controls',
    methods: {
      clear: {
        description: 'Clear localStorage',
        func () {
          return resetLocalStorage({ message: 'Clearing localStorage' })
        }
      },
      dump: {
        description: 'dump the data as JSON',
        func (message) {
          return serializeLocalStorage(message)
        }
      },
      copy: {
        description: 'copy the data to clipboard',
        func (message) {
          return copy(serializeLocalStorage(message))
        }
      },
      preset0: {
        description: 'Sets localStorage in a typical state',
        func () {
          return resetLocalStorage(require('./preset0'))
        }
      }
    }
  }
})
