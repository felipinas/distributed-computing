const add = (call, callback) => {
  console.log(call);

  const { num1, num2 } = call.request;
  
  callback(null, num1 + num2);
}

module.exports = add;