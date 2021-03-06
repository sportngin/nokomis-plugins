var Plugin = require('nokomis/plugin')
var requestTimeout = require('request-timeout')

module.exports = Plugin.extend({

  initialize: function(conf) {
    this.conf = conf
  },

  run: function(instance, callback) {
    var seconds = instance.timeoutLength || this.conf || 20
    requestTimeout(instance.req, instance.res, seconds)
    callback()
  }

})
