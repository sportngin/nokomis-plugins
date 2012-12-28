var assert = require('assert')
var sinon = require('sinon')
var ControllerFactory = require('./fixtures/controller')
var ContentNegotiator = require('../plugins/contentNegotiator')

var Controller
var instance

describe('Content Negotiator', function() {

  beforeEach(function(done) {
    Controller = ControllerFactory.create()
    Controller.addPlugin(ContentNegotiator)
    instance = ControllerFactory.init(Controller)

    instance.runPlugins(function(){
      // override the negotiator methods with spys
      instance._neg.preferredMediaType = sinon.spy()
      instance._neg.preferredMediaTypes = sinon.spy()
      instance._neg.preferredLanguage = sinon.spy()
      instance._neg.preferredLanguages = sinon.spy()
      instance._neg.preferredEncoding = sinon.spy()
      instance._neg.preferredEncodings = sinon.spy()
      done()
    })
  })

  describe('Media Type', function() {

    it('should have preferredMediaType method', function(done) {
      assert(instance.preferredMediaType)
      done()
    })

    it('should forward the preferredMediaType method call', function(done) {
      instance.preferredMediaType('application/json')
      assert(instance._neg.preferredMediaType.calledOnce)
      assert(instance._neg.preferredMediaType.calledWith('application/json'))
      done()
    })

    it('should have preferredMediaTypes method', function(done) {
      assert(instance.preferredMediaTypes)
      done()
    })

    it('should forward the preferredMediaTypes method call', function(done) {
      instance.preferredMediaTypes('application/json')
      assert(instance._neg.preferredMediaTypes.calledOnce)
      assert(instance._neg.preferredMediaTypes.calledWith('application/json'))
      done()
    })

    it('should override controllers mediaType method', function(done) {
      instance.mediaType()
      assert(instance._neg.preferredMediaType.calledOnce)
      done()
    })

  })

  describe('Language', function() {

    it('should have preferredLanguage method', function(done) {
      assert(instance.preferredLanguage)
      done()
    })

    it('should forward the preferredLanguage method call', function(done) {
      instance.preferredLanguage('en')
      assert(instance._neg.preferredLanguage.calledOnce)
      assert(instance._neg.preferredLanguage.calledWith('en'))
      done()
    })

    it('should have preferredLanguages method', function(done) {
      assert(instance.preferredLanguages)
      done()
    })

    it('should forward the preferredLanguages method call', function(done) {
      instance.preferredLanguages('en')
      assert(instance._neg.preferredLanguages.calledOnce)
      assert(instance._neg.preferredLanguages.calledWith('en'))
      done()
    })

  })

  describe('Encoding', function() {

    it('should have preferredEncoding method', function(done) {
      assert(instance.preferredEncoding)
      done()
    })

    it('should forward the preferredEncoding method call', function(done) {
      instance.preferredEncoding('utf-8')
      assert(instance._neg.preferredEncoding.calledOnce)
      assert(instance._neg.preferredEncoding.calledWith('utf-8'))
      done()
    })

    it('should have preferredEncodings method', function(done) {
      assert(instance.preferredEncodings)
      done()
    })

    it('should forward the preferredEncodings method call', function(done) {
      instance.preferredEncodings('utf-8')
      assert(instance._neg.preferredEncodings.calledOnce)
      assert(instance._neg.preferredEncodings.calledWith('utf-8'))
      done()
    })

  })

})
