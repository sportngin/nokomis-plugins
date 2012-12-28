var assert = require('assert')
var sinon = require('sinon')
var ControllerFactory = require('./fixtures/controller')
var Respond = require('../plugins/respond')

var Controller
var instance

describe('Respond', function() {

  beforeEach(function(done) {
    Controller = ControllerFactory.create()
    Controller.addPlugin(Respond)
    instance = ControllerFactory.init(Controller)
    instance.runPlugins(done)
  })

  describe('redirect', function() {

    beforeEach(function(){
      instance.preferredMediaType = sinon.spy(function(){
        return 'text/html'
      })
      instance.html = sinon.spy()
      instance.json = sinon.spy()
    })

    it('should add redirect method to controller', function(done) {
      assert(instance.redirect)
      done()
    })

    it('should respond with HTML redirect message', function(done) {
      instance.redirect('/page')
      assert(instance.html.calledOnce)
      assert(!instance.json.called)
      done()
    })

    it('should respond with JSON redirect message', function(done) {
      instance.preferredMediaType = sinon.spy(function(){
        return 'application/json'
      })

      instance.redirect('/page')
      assert(!instance.html.called)
      assert(instance.json.calledOnce)
      done()
    })

    it('should set location header', function(done) {
      instance.redirect('/page')
      assert(instance.res.setHeader.calledWith('location', '/page'))
      done()
    })

  })

  describe('html', function() {

    beforeEach(function(){
      instance.send = sinon.spy()
    })

    it('should add html method to controller', function(done) {
      assert(instance.html)
      done()
    })

    it('should call send', function(done) {
      instance.html('body')
      assert(instance.send.calledOnce)
      assert(instance.send.calledWith('body', undefined, {'content-type':'text/html'}))

      instance.html('', 204)
      assert(instance.send.calledWith('', 204))
      done()
    })

  })

  describe('json', function() {

    beforeEach(function(){
      instance.send = sinon.spy()
    })

    it('should add json method to controller', function(done) {
      assert(instance.json)
      done()
    })

    it('should call send', function(done) {
      instance.json({data:'body'})
      assert(instance.send.calledOnce)
      assert(instance.send.calledWith('{"data":"body"}', undefined, {'content-type':'application/json'}))

      instance.json(undefined, 204)
      assert(instance.send.calledWith(undefined, 204))
      done()
    })

  })

})
