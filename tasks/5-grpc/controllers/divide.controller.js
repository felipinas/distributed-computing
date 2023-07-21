const divide =  ({ request }, callback) => {
  const { num1, num2 } = request;

  const isADivisionByZero = num2 === 0;

  if (isADivisionByZero) {
    const error = new Error('Division by zero is not allowed');

    error.code = grpc.status.INVALID_ARGUMENT;

    return callback(error);
  }

  const result = num1 / num2;

  callback(null, result);
};

module.exports = divide;