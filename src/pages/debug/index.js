console.log('__DEBUG_MODE__')

const menu = require('chrome-console-debug-menu')
const { resetLocalStorage } = menu

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
      preset0: {
        description: 'Sets localStorage in a typical state',
        func () {
          return resetLocalStorage(require('./preset0'))
        }
      }
    }
  }
})
