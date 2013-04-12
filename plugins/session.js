
var Plugin = require('nokomis/plugin')
var Krumkake = require('krumkake')

module.exports = Plugin.extend({

  initialize: function(config) {
    this.config = config
  },

  run: function(instance, callback) {
    instance.session = new Krumkake(instance.req, instance.res, this.config)
    callback()
  }

})
