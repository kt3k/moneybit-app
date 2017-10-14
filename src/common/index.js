require('babel-polyfill')

if (process.env.NODE_ENV !== 'production') {
  require('capsid/debug')
}
global.basepath = process.env.BASEPATH || ''
global.t10 = require('t10')
global.capsid = require('capsid')
global.$ = require('jquery')
require('capsid/jquery')(capsid, $)
require('capsid/outside-events')(capsid)

require('./quarks')
require('./molecules')
require('./organisms')
require('../app/')
