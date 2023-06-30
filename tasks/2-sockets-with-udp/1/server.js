const dgram = require('dgram');
const readline = require('readline');
const { CLIENT_PORT, SERVER_PORT } = require('./consts');

const server = dgram.createSocket('udp4');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

server.on('listening', () => {
  rl.addListener('line', (line) => {
    server.send(line, CLIENT_PORT);
  })
});

server.on('message', (msg) => {
  console.log(`Client said: ${msg.toString()}`);
});

server.bind(SERVER_PORT);
