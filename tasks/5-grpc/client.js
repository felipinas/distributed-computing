const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatorPackage = grpcObject.calculator;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const client = new calculatorPackage.CalculatorService("localhost:40000", grpc.credentials.createInsecure());

const main = async () => {
  const valueOne = await new Promise((resolve) => rl.question('Value one: ', resolve));
  const valueTwo = await new Promise((resolve) => rl.question('Value two: ', resolve));
  const operation = await new Promise((resolve) => rl.question('Operation (1 (+)/2 (-)/3 (x)/ 4 (/)): ', resolve));

  switch (operation) {
    case '1':
      client.add({num1: valueOne, num2: valueTwo},  (_, result) => console.log(result))
    default:
      return;
  }
};

main();
