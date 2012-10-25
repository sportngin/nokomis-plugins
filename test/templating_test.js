var assert = require('assert')
var sinon = require('sinon')
var ControllerFactory = require('./fixtures/controller')
var Templating = require('../plugins/templating')

var Controller
var instance

var noop = function(){}

describe('Templating', function() {

  beforeEach(function(done) {
    Controller = ControllerFactory.create()
    Controller.addPlugin(Templating, {templatePath:'../test/fixtures/templates'})
    instance = ControllerFactory.init(Controller)

    done()
  })

  describe('Exists', function() {

    it('should add tmpl object to controller', function(done) {
      assert(instance.tmpl)
      done()
    })

    it('should add render method to controller', function(done) {
      assert(instance.render)
      done()
    })

  })

  describe('Render', function() {

    it('should call tmpl.render', function(done) {
      instance.template = 'template.html'
      instance.model = {}
      instance.templateOptions = {}

      instance.tmpl.render = sinon.spy()
      instance.render(noop)

      assert(instance.tmpl.render.calledOnce)
      assert(instance.tmpl.render.calledWith(
        instance.template,
        instance.model,
        instance.templateOptions,
        noop
      ))

      done()
    })

  })

})
