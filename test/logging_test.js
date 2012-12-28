var assert = require('assert')
var sinon = require('sinon')
var ControllerFactory = require('./fixtures/controller')
var Stream = require('stream')
var Logging = require('../plugins/logging')

var Controller
var instance

var config = { name:'test', stream: new Stream }
config.stream.write = function(){}

describe('Logging', function() {

  beforeEach(function(done) {

    Controller = ControllerFactory.create()
    Controller.addPlugin(Logging, config)
    instance = ControllerFactory.init(Controller)
    instance.runPlugins(done)
  })

  describe('Exists', function() {

    it('should add log method to controller', function(done) {
      assert(instance.log)
      done()
    })

    it('should add log method to request', function(done) {
      assert(instance.req.log)
      done()
    })

    it('should add log method to response', function(done) {
      assert(instance.res.log)
      done()
    })

    it('should log response on request finished', function(done) {
      instance.req.log.info = sinon.spy()
      assert(!instance.req.log.info.called)
      instance.req.emit('finish')
      assert(instance.req.log.info.called)
      done()
    })

  })

})
