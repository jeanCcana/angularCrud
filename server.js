const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/mono-app'));

// Send all requests to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/mono-app/index.html'));
});

// default Heroku port
const server = app.listen(process.env.PORT || 5000);

//socket
const socketIo = require('socket.io')
const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado')

  socket.on('disconnect', () => {
    console.log('Usuario desconectado')
  })
})
