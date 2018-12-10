require('@babel/polyfill')

global.basepath = process.env.BASEPATH || ''
global.t10 = require('t10')
global.capsid = require('capsid')
if (process.env.NODE_ENV !== 'production') {
  global.capsid.install(require('capsid/debug'))
}
global.capsid.on.useHandler('change')
global.capsid.on.useHandler('input')
global.Action = require('../const/action-types.js')
global.$ = require('jquery')
global.domain = require('../domain')
global.moment = require('moment')
global.util = require('./util')
capsid.install(require('capsid/outside-events'))
global.capsidPopper = require('capsid-popper')
capsid.install(global.capsidPopper)
global.capsidScrollLock = require('capsid-scroll-lock')
capsid.install(global.capsidScrollLock)

require('./quarks')
require('./atoms')
require('./molecules')
require('./organisms')
require('../store')
