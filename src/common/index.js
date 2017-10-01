require('babel-polyfill')

if (process.env.NODE_ENV !== 'production') {
  require('capsid/debug')
}
global.basepath = process.env.BASEPATH || ''
global.t10 = require('t10')
global.capsid = require('capsid')
global.$ = require('jquery')
const capsidJQuery = require('capsid/jquery.js')
capsidJQuery(global.capsid, global.$)

require('./organisms')
require('../app/')
