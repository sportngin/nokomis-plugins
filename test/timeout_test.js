var assert = require('assert')
var sinon = require('sinon')
var ControllerFactory = require('./fixtures/controller')
var Timeout = require('../plugins/timeout')

var Controller
var instance

describe('Timeout', function() {

  beforeEach(function(done) {
    Controller = ControllerFactory.create()
    Controller.prototype.timeout = sinon.spy()
    Controller.addPlugin(Timeout, 0.05)
    instance = ControllerFactory.init(Controller)

    done()
  })

  describe('Exists', function() {

    it('should fire timeout event', function(done) {
      var t = setTimeout(function(){
        assert(false)
        done()
      }, 100)
      instance.req.on('timeout', function(){
        clearTimeout(t)
        assert(true)
        done()
      })
    })

  })

})
