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

const remove = (array, item) => {
  if (!array.includes(item)) {
    return
  }

  array.splice(array.indexOf(item), 1)
}

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
      window.devtoolsFormatters.push(new MenuFormatter())
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
    remove(keys, 'description')
    remove(keys, 'methods')
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
    this[name] = method
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
      `  ${this.reference()}.${method.name}() - ${method.description}`
    ).join('\n') + '\n'
  }

  message () {
    return this.messageSubMenus() + this.messageMethods()
  }
}

/**
 * Resets the localStorage contents by the given data, outputing the given message.
 * @param {string} message The message
 * @param {any} data The data to set
 */
const resetLocalStorage = (message, data) => {
  data = data || {}
  console.log(`%c ${message}`, 'color: red;')

  localStorage.clear()

  Object.keys(data).forEach(key => {
    let value = data[key]

    if (typeof value === 'string') {
      // does nothing
    } else if (typeof value === 'object') {
      value = JSON.stringify(value)
    } else {
      throw new Error(`invalid value type: ${typeof value}`)
    }

    localStorage.setItem(key, value)
  })

  return localStorage
}

module.exports = Menu
module.exports.resetLocalStorage = resetLocalStorage
