require('babel-polyfill')

if (process.env.NODE_ENV !== 'production') {
  require('capsid/debug')
}
global.basepath = process.env.BASEPATH || ''
global.t10 = require('t10')
global.capsid = require('capsid')
global.$ = require('jquery')
require('capsid/jquery.js')(capsid, $)

require('./quarks')
require('./organisms')
require('../app/')
