var assert = require('assert')
var sinon = require('sinon')
var ControllerFactory = require('./fixtures/controller')
var Cookies = require('../plugins/cookies')

var Controller
var instance

describe('Cookies', function() {

  beforeEach(function(done) {
    Controller = ControllerFactory.create()
    Controller.addPlugin(Cookies)
    instance = ControllerFactory.init(Controller)
    instance.runPlugins(done)
  })

  describe('Exists', function() {

    it('should add cookies object to controller', function(done) {
      assert(instance.cookies)
      done()
    })

    it('should add cookies object to request', function(done) {
      assert(instance.req.cookies)
      done()
    })

  })

})
