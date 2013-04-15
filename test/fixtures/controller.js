var sinon = require('sinon')
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
  c.route = { params:{} }
  c.req = req()
  c.res = res()
  c._render = sinon.spy()
  c.templateOptions = {}
  c.log = {
    info: sinon.spy(),
    warn: sinon.spy(),
    trace: sinon.spy(),
    error: sinon.spy()
  }
  return c
}

module.exports = {
  create: create,
  init:init
}
