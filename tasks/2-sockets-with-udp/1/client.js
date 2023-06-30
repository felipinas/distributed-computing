const dgram = require('dgram');
const readline = require('readline');
const { CLIENT_PORT, SERVER_PORT } = require('./consts');

const client = dgram.createSocket('udp4');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

client.on('listening', () => {
  rl.addListener('line', (line) => {
    client.send(line, SERVER_PORT);
  })
});

client.on('message', (msg) => {
  console.log(`Server said: ${msg.toString()}`);
});

client.bind(CLIENT_PORT);
