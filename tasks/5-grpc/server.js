const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { addController, subtractController, multiplyController, divideController } = require('./controllers')

const packageDef = protoLoader.loadSync(__dirname + "/calculator.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatorPackage = grpcObject.calculator;

const server = new grpc.Server();

server.addService(calculatorPackage.CalculatorService.service, {
  add: addController,
  subtract: subtractController,
  multiply: multiplyController,
  divide: divideController,
});

server.bindAsync('0.0.0.0:5005', grpc.ServerCredentials.createInsecure(), () => {
  console.log('rodando');

  server.start();
});
