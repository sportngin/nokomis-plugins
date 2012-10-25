
var sinon = require('sinon')
var EventEmitter = require('events').EventEmitter

module.exports = function(){
  var ee = new EventEmitter()

  return {
    setHeader: sinon.spy(),
    end: sinon.spy(),
    on: sinon.spy(ee.on.bind(ee)),
    emit: sinon.spy(ee.emit.bind(ee))
  }
}
