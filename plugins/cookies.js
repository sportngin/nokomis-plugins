
var Plugin = require('nokomis/plugin')
var Cookies = require('cookies')
var Keygrip = require('keygrip')

module.exports = Plugin.extend({

  initialize: function(config) {
    this.cookieKeys = config && config.secrets ? new Keygrip(config.secrets) : undefined
  },

  run: function(instance, callback) {
    var req = instance.req
    var res = instance.res
    instance.cookies = req.cookies = new Cookies(req, res, this.cookieKeys)
    callback()
  }

})