const dgram = require('dgram');
const { SERVER_PORT, CLIENT_PORT, OPERATIONS } = require('../consts');

const server = dgram.createSocket('udp4');

server.on('message', (msg) => {
  var result = new Uint16Array(1);

  const [ operation, valueOne, valueTwo ] = msg;

  switch (operation) {
    case OPERATIONS.ADDITION:
      result[0] = valueOne + valueTwo;
      break;
    case OPERATIONS.SUBTRACTION:
      result[0] = valueOne - valueTwo;
      break;
    case OPERATIONS.MULTIPLICATION:
      result[0] = valueOne * valueTwo;
      break;
    case OPERATIONS.DIVISION:
      result[0] = valueOne / valueTwo;
      break;
    default:
      result[0] = undefined;
  }
  
  server.send(Buffer.from(result), 0, result.length, CLIENT_PORT, 'localhost');
});

server.bind(SERVER_PORT);
