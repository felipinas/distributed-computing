const multiply = ({ request }, callback) => {
  const { num1, num2 } = request;

  const result = num1 * num2;

  callback(null, result);
};

module.exports = multiply;