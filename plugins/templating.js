var Plugin = require('nokomis/plugin')
var _ = require('underscore')
var path = require('path')
var extendable = require('extendable')

var Templating = require('nokomis/templating')

module.exports = Plugin.extend({

  initialize: function(config) {
    var tmpl = this.tmpl = new Templating()
    tmpl.templatePath = config.templatePath || tmpl.templatePath
  },

  run: function(instance) {
    instance.tmpl = this.tmpl
  },

  render: function(callback) {
    var tmpl = this.template
    var data = this.model
    var options = this.templateOptions || {}
    this.tmpl.render(tmpl, data, options, callback)
  }

})
