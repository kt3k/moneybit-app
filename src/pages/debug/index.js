console.log('__DEBUG_MODE__')

const Menu = require('./menu')
const { resetLocalStorage } = Menu

global.m = Menu.create('m', {
  ls: {
    description: 'localStorage controls',
    methods: {
      clear: {
        description: 'Clear localStorage',
        func () {
          return resetLocalStorage('Clearing localStorage')
        }
      },
      preset0: {
        description: 'Sets localStorage in a typical state',
        func () {
          const { message, localStorage } = require('./preset0')
          return resetLocalStorage(message, localStorage)
        }
      }
    }
  }
})
