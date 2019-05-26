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
      },
      preset1: {
        description: 'Sets localStorage to the snapshot of 2019-05-26',
        func () {
          return resetLocalStorage(require('./preset1'))
        }
      }
    }
  },
  m: {
    description: 'model controls',
    methods: {
      ls: {
        desc: 'Show models',
        func () {
          return capsid.get('js-store', document.querySelector('.js-store'))
        }
      }
    }
  },
  c: {
    description: 'capsid debug menus',
    methods: {
      ls: {
        desc: 'list capsid components',
        func () {
          const obj = {}

          Object.keys(capsid.__ccc__).forEach(key => {
            obj[key] = document.querySelectorAll(
              `.${key}.${key}-initialized`
            ).length
          })
          return console.table(obj)
        }
      }
    }
  }
})
