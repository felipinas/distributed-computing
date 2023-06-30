const net = require('net');
const readline = require('readline');
const { SERVER_PORT, HOST } = require('../consts');

const client = new net.Socket();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

client.connect(SERVER_PORT, HOST, async () => {
  const arr = new Uint16Array(3);

  arr[1] = await new Promise((resolve) => rl.question('Value one: ', resolve));
  arr[2] = await new Promise((resolve) => rl.question('Value two: ', resolve));
  arr[0] = await new Promise((resolve) => rl.question('Operation (1 (+)/2 (-)/3 (x)/ 4 (/)): ', resolve));
  
  const message = Buffer.from(arr);

  client.write(message);
});

client.on('data', ([ result ]) => {
  console.log(`Result: ${result}`);

  client.close();
});
