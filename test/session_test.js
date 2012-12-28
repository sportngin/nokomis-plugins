var assert = require('assert')
var sinon = require('sinon')
var ControllerFactory = require('./fixtures/controller')
var Session = require('../plugins/session')

var Controller
var instance

describe('Session', function() {

  beforeEach(function(done) {
    Controller = ControllerFactory.create()
    Controller.addPlugin(Session)
    instance = ControllerFactory.init(Controller)
    instance.runPlugins(done)
  })

  describe('Exists', function() {

    it('should add session object to controller', function(done) {
      assert(instance.session)
      done()
    })

  })

})
