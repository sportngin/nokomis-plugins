/**
 * Automatically load all of the nokomis plugins
 */

var glob = require('glob')

var plugins = module.exports = {}

glob.sync('*', {cwd:__dirname+'/plugins'}).forEach(function(file) {
  file = file.replace(/\.js$/, '')
  var module = require('./plugins/'+file)
  file = file.charAt(0).toUpperCase() + file.slice(1)
  plugins[file] = module
})
