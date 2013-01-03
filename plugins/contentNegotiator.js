
var Plugin = require('nokomis/plugin')
var Negotiator = require('negotiator')
var Url = require('url')

var formatMap = {
  'html': 'text/html',
  'json': 'application/json',
  'xml': 'application/xml'
}

var ContentNegotiator = module.exports = Plugin.extend({

  run: function(instance, callback) {
    instance._neg = new Negotiator(instance.req)
    callback()
  },

  preferredMediaType: function() {
    return this._neg.preferredMediaType.apply(this._neg, arguments)
  },

  preferredMediaTypes: function() {
    return this._neg.preferredMediaTypes.apply(this._neg, arguments)
  },

  preferredLanguage: function() {
    return this._neg.preferredLanguage.apply(this._neg, arguments)
  },

  preferredLanguages: function() {
    return this._neg.preferredLanguages.apply(this._neg, arguments)
  },

  preferredEncoding: function() {
    return this._neg.preferredEncoding.apply(this._neg, arguments)
  },

  preferredEncodings: function() {
    return this._neg.preferredEncodings.apply(this._neg, arguments)
  },

  mediaType: function() {
    var availableTypes = this.availableMediaTypes

    var fmt = this.route.params.format
    if (fmt && fmt in formatMap) {
      fmt = formatMap[fmt]
      if (~availableTypes.indexOf(fmt)) {
        availableTypes = [fmt]
      }
    }

    var type = this.preferredMediaType(availableTypes)
    return type || this._defaultMediaType
  }

})
