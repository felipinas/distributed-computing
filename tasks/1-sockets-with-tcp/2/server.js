const net = require('net');
const readline = require('readline');
const { PORT, HOST } = require('../consts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const clients = [];

const handleConnection = (socket) => {
  let userName = "";

  socket.write("What's your name?")

  socket.on('data', (data) => {
    if (!userName) {
      userName = data.toString();
      clients.push({ socket });

      socket.write(`========================`);
      socket.write(`Welcome, ${userName}! Now you can send messages :) \n`);
      socket.write(`========================`);

      return;
    }

    for (const { socket: clientSocket } of clients) {
      clientSocket.write(`${userName}: ${data}`);
    }
  });
}

const server = net.createServer(handleConnection);

server.listen(PORT, HOST);
