const net = require('net');
const readline = require('readline');
const { PORT, HOST } = require('../consts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const handleConnection = (socket) => {
  rl.addListener('line', (line) => {
    socket.write(line);
  })

  socket.on('data', (data) => {
    console.log(`The client said: ${data.toString()}`);
  });
}

const server = net.createServer(handleConnection);

server.listen(PORT, HOST);
