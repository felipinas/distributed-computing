const { add } = require('./add.controller');
const { subtract } = require('./subtract.controller');
const { divide } = require('./divide.controller');
const { multiply } = require('./multiply.controller');

module.exports = {
  addController: add,
  subtractController: subtract,
  divideController: divide,
  multiplyController: multiply,
}