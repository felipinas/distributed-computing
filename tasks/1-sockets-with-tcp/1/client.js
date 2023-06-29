const net = require('net');
const readline = require('readline');
const { PORT, HOST } = require('../consts');

const client = new net.Socket();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

client.connect(PORT, HOST, () => {
  rl.addListener('line', (line) => {
    client.write(line);
  })
});

client.on('data', (data) => {
  console.log(`The server said: ${data.toString()}`);
});
