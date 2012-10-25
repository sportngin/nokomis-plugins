
var Controller = require('nokomis/controller')
var req = require('./req')
var res = require('./res')
var route = require('./route')

function create() {
  return Controller.extend({})
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
