var Templating = require('./templating')
var Handlebars

try {
  Handlebars = require('handlebars')
} catch (ex) { }

var HBTmpl = module.exports = Templating.extend({

  initialize: function(config) {
    if (!Handlebars) throw new Error('Handlebars is not installed')
    var self = this
    HBTmpl.__super__.initialize.apply(this, arguments)
    this.tmpl.templatePath = config.templatePath
    this.tmpl.engine = Handlebars
    this.tmpl.extension = 'hb'
    this.tmpl.preload(null, function(){
      registerPartials(self.tmpl.cache)
      registerHelpers(config.templatePath)
    })
  }

})

function registerPartials(templates) {
  Object.keys(templates).forEach(function(file) {
    Handlebars.registerPartial(file.replace(/\//g,'.'), templates[file])
  })
}

function registerHelpers(basePath) {
  var glob = require('glob')
  glob.sync(basePath + '/helpers/**/*.js').forEach(function(s) {
    require(s)
  })
}
