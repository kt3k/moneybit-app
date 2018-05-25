require('babel-polyfill')

if (process.env.NODE_ENV !== 'production') {
  require('capsid/debug')
}
global.basepath = process.env.BASEPATH || ''
global.t10 = require('t10')
global.capsid = require('capsid')
global.Action = require('../const/action-types.js')
global.$ = require('jquery')
global.domain = require('../domain')
global.util = require('./util')
require('capsid/jquery')(capsid, $)
require('capsid/outside-events')(capsid)
global.capsidPopper = require('capsid-popper')
capsid.install(global.capsidPopper)
global.capsidScrollLock = require('capsid-scroll-lock')
capsid.install(global.capsidScrollLock)

require('./quarks')
require('./atoms')
require('./molecules')
require('./organisms')
require('../store')
