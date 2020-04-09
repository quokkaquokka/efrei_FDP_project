const SocketIo = require('socket.io');
const dmh = require('./droneMessageHandler');

const init = (hapiServer) => {
  console.log('SOCKET INIT')
  const io = SocketIo.listen(hapiServer.listener)

  io.sockets.on('connection', (socket) => {
    console.log('SIO: connexion');
    socket.emit('welcome', socket.id)

    // test socket
    socket.on('another-event', function (data) {
      console.log('SIO: another-event');
      socket.emit('msg', 'ACK')
    });
    /////// end test

    socket.on('close-intervention', (data) => {
      console.log('SIO: close-intervention');
      dmh.closeIntervention(data.uuid)
      socket.broadcast.emit('remove-intervention', data)
    })

    socket.on('return-intervention', (data) => {
      if (typeof data === 'string') data = JSON.parse(data)
      console.log('SIO: return-intervention', data);
      const status = dmh.returnIntervention(data.uuid)
      if (status) {
        socket.broadcast.emit('returned-intervention', data)
        socket.emit('return-intervention-accepted')
      }
    })


    socket.on('take-intervention', (data) => {
      if (typeof data === 'string') data = JSON.parse(data)
      console.log('SIO: take-intervention', data);
      const status = dmh.takeIntervention(data.uuid)
      if (status) {
        socket.broadcast.emit('disable-intervention', data)
        socket.emit('take-intervention-accepted')
      } else {
        socket.emit('take-intervention-refused')
      }
    })

  })

  console.log('coucou')
  exp.appSockets.front = io
}

const getSocket = () => {
  return exp.appSockets.front
}

const exp = module.exports = {
  appSockets: {},
  init,
  getSocket,
}

