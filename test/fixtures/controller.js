
var Controller = require('nokomis/controller')
var Plugin = require('nokomis/plugin')
var req = require('./req')
var res = require('./res')
var route = require('./route')

function create() {
  var C = Controller.extend({})
  Plugin.makePluggable(C)
  return C
}

function init(C, conf) {
  return new C({
    req:req(),
    res:res(),
    route:route,
    config:conf
  })
}

module.exports = {
  Controller: Controller,
  create: create,
  init:init
}
