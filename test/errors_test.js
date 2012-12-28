var assert = require('assert')
var sinon = require('sinon')
var ControllerFactory = require('./fixtures/controller')
var Errors = require('../plugins/errors')

var Controller
var instance

var oldError

describe('Errors', function() {

  before(function(done) {
    oldError = console.error
    console.error = sinon.spy()
    done()
  })

  after(function(done){
    console.error = oldError
    done()
  })

  beforeEach(function(done) {
    Controller = ControllerFactory.create()
    Controller.addPlugin(Errors)
    instance = ControllerFactory.init(Controller)

    instance.runPlugins(function() {
      sinon.spy(instance, 'error')
      sinon.spy(instance, '_render')
      done()
    })
  })

  describe('Exists', function() {

    it('should override error method to controller', function(done) {
      assert(instance.error !== Controller.prototype.error)
      done()
    })

  })

  describe('Domain', function() {

    it('should handle error event from controller', function(done) {
      instance.emit('error', new Error('Bad things happened.'))
      assert(instance.error.calledOnce)
      assert(instance.req.client.server.close.calledOnce)
      done()
    })

    it('should render errors', function(done) {
      instance.emit('error', new Error('Bad things happened.'))
      assert(instance._render.calledOnce)
      done()
    })

  })

})
