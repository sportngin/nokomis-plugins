
var EventEmitter = require('events').EventEmitter
var Plugin = require('nokomis/plugin')
var req = require('./req')
var res = require('./res')
var route = require('./route')
var _ = require('underscore')

function create() {
  var C = function(){
    EventEmitter.call(this)
  }
  _.extend(C.prototype, EventEmitter.prototype)
  Plugin.makePluggable(C)
  return C
}

function init(C, conf) {
  var c = new C()
  c.req = req()
  c.res = res()
  c._render = function(){}
  c.templateOptions = {}
  return c
}

module.exports = {
  create: create,
  init:init
}
