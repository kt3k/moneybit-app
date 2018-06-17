(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class MenuFormatter {
  header (menu) {
    if (!(menu instanceof Menu)) {
      return null
    }

    return ['div', menu.message()]
  }

  hasBody () {
    return false
  }

  body () {
    return null
  }
}

const menuFormatter = new MenuFormatter()

/**
 * Removes the given item from the given array.
 * @param {Array} array
 * @param {any} item
 * @return {Array}
 */
const remove = (array, item) => {
  if (!array.includes(item)) {
    return
  }

  array.splice(array.indexOf(item), 1)
}

const SPECIAL_KEYS = [
  'desc',
  'description',
  'methods'
]

class Menu {
  constructor () {
    this.menus = []
    this.methods = []
    this.parent = null

    Menu.initFormatter()
  }

  static initFormatter () {
    window.devtoolsFormatters = window.devtoolsFormatters || []
    if (!window.devtoolsFormatters.includes(menuFormatter)) {
      window.devtoolsFormatters.push(menuFormatter)
    }
  }

  static create (name, obj) {
    return Menu.createWithSymbol(name, obj)
  }

  static createWithSymbol (symbol, obj) {
    const menu = new Menu()
    menu.symbol = symbol

    Menu.getSubmenuKeys(obj).forEach(key => {
      const submenu = Menu.createWithSymbol(key, obj[key])
      menu.addMenu(submenu)
    })

    menu.description = obj.description || obj.desc

    const methods = obj.methods || {}

    Object.keys(methods).forEach(key => {
      const method = methods[key]
      menu.addMethod(key, method.func, method.description || method.desc)
    })

    return menu
  }

  static getSubmenuKeys (obj) {
    const keys = Object.keys(obj)

    SPECIAL_KEYS.forEach(key => { remove(keys, key) })

    return keys
  }

  /**
   * @param {Menu} menu The menu to add
   */
  addMenu (menu) {
    this.menus.push(menu)
    menu.parent = this

    this[menu.symbol] = menu
  }

  /**
   * @param {Function} method The method
   * @param {string} description The description
   */
  addMethod (name, method, description) {
    this.methods.push({ name: name, description })
    Object.defineProperty(this, name, { get: method })
  }

  reference () {
    if (this.parent == null) {
      return this.symbol
    }

    return `${this.parent.reference()}.${this.symbol}`
  }

  messageSubMenus () {
    if (this.menus.length === 0) {
      return ''
    }

    return 'sub menus\n' + this.menus.map(menu =>
      `  ${menu.reference()} - ${menu.description}`
    ).join('\n') + '\n'
  }

  messageMethods () {
    if (this.methods.length === 0) {
      return ''
    }

    return 'methods\n' + this.methods.map(method =>
      `  ${this.reference()}.${method.name} - ${method.description}`
    ).join('\n') + '\n'
  }

  message () {
    return this.messageSubMenus() + this.messageMethods()
  }
}

/**
 * Resets the localStorage contents by the given data, outputing the given message.
 * @param {string} message The message
 * @param {any} localStorage The data to set
 */
const resetLocalStorage = ({ message, localStorage }) => {
  localStorage = localStorage || {}
  console.log(`%c ${message}`, 'color: indianred;')

  window.localStorage.clear()

  Object.keys(localStorage).forEach(key => {
    const value = localStorage[key]

    if (typeof value === 'string') {
      window.localStorage.setItem(key, value)
    } else if (typeof value === 'object') {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      throw new Error(`invalid value type: ${typeof value}`)
    }
  })

  return window.localStorage
}

const serializeLocalStorage = (message) => {
  const obj = {}

  Object.keys(localStorage).forEach(key => {
    const value = localStorage.getItem(key)
    obj[key] = parseIfPossible(value)
  })

  return JSON.stringify({
    message,
    localStorage: obj
  }, null, 2)
}

/**
 * Tries parse the value as JSON and returns parsed object if parsed, return the value itself if not parsed.
 * @param {string} value The value to parse
 */
const parseIfPossible = value => {
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

module.exports = Menu
module.exports.resetLocalStorage = resetLocalStorage
module.exports.serializeLocalStorage = serializeLocalStorage
module.exports.MenuFormatter = MenuFormatter

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

/* global copy */

console.log('__DEBUG_MODE__');

var menu = require('chrome-console-debug-menu');
var resetLocalStorage = menu.resetLocalStorage,
    serializeLocalStorage = menu.serializeLocalStorage;


global.m = menu.create('m', {
  ls: {
    description: 'localStorage controls',
    methods: {
      clear: {
        description: 'Clear localStorage',
        func: function func() {
          return resetLocalStorage({ message: 'Clearing localStorage' });
        }
      },
      dump: {
        description: 'dump the data as JSON',
        func: function func(message) {
          return serializeLocalStorage(message);
        }
      },
      copy: {
        description: 'copy the data to clipboard',
        func: function func(message) {
          return copy(serializeLocalStorage(message));
        }
      },
      preset0: {
        description: 'Sets localStorage in a typical state',
        func: function func() {
          return resetLocalStorage(require('./preset0'));
        }
      }
    }
  },
  m: {
    description: 'model controls',
    methods: {
      ls: {
        desc: 'Show models',
        func: function func() {
          return capsid.get('js-store', document.querySelector('.js-store'));
        }
      }
    }
  },
  c: {
    description: 'capsid debug menus',
    methods: {
      ls: {
        desc: 'list capsid components',
        func: function func() {
          var obj = {};

          Object.keys(capsid.__ccc__).forEach(function (key) {
            obj[key] = document.querySelectorAll('.' + key + '.' + key + '-initialized').length;
          });
          return console.table(obj);
        }
      }
    }
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./preset0":3,"chrome-console-debug-menu":1}],3:[function(require,module,exports){
module.exports={
  "localStorage": {
    "user-1": {
      "id": "1",
      "documents": [],
      "settings": {
        "defaultChartId": null,
        "languageCode": "en"
      }
    }
  }
}

},{}]},{},[2]);
