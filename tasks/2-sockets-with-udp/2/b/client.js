const dgram = require('dgram');
const readline = require('readline');
const { SERVER_PORT, CLIENT_PORT } = require('../consts');

const client = dgram.createSocket('udp4');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

client.on('listening', async () => {
  const arr = new Uint16Array(3);

  arr[1] = await new Promise((resolve) => rl.question('Value one: ', resolve));
  arr[2] = await new Promise((resolve) => rl.question('Value two: ', resolve));
  arr[0] = await new Promise((resolve) => rl.question('Operation (1 (+)/2 (-)/3 (x)/ 4 (/)): ', resolve));
  
  const message = Buffer.from(arr);

  client.send(message, SERVER_PORT);
});

client.on('message', ([ result ]) => {
  console.log(`Result: ${result}`);

  client.close();
});

client.bind(CLIENT_PORT);
