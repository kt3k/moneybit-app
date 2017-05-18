require('babel-polyfill')

global.basepath = process.env.BASEPATH || ''
global.t10 = require('t10')
global.capsid = require('capsid')
global.$ = require('jquery')
const capsidJQuery = require('capsid/jquery.js')
capsidJQuery(global.capsid, global.$)

const InitService = require('../app/init-service')

new InitService().init()
