
var Plugin = require('nokomis/plugin')
var Krumkake = require('krumkake')

module.exports = Plugin.extend({

  run: function(instance, callback) {
    var conf = instance.config
    var sessConf = conf && conf.session || { }
    instance.session = new Krumkake(instance.req, instance.res, sessConf)
    callback()
  }

})
