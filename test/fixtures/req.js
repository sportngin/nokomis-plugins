
var sinon = require('sinon')
var EventEmitter = require('events').EventEmitter

module.exports = function() {
  var ee = new EventEmitter()

  return {
    on: sinon.spy(ee.on.bind(ee)),
    emit: sinon.spy(ee.emit.bind(ee)),
    client: {
      server: {
        close: sinon.spy()
      }
    },
    socket: {
      remoteAddress: '192.168.1.1',
      remotePort: 12345,
      address: function() { return {address:'192.168.1.1', port:12345 } }
    },
    headers: {}
  }
}
