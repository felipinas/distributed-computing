/*
Modifique o exercício 3. para que, além de exibir os dados dos produtos, seja exibido a média de
preço dos últimos 3 produtos (isto é, você terá que encontrar um meio de acumular dados da stream
relativos às últimas requisições/produtos para assim calcular a média de preço). A média deve ser
mostrada com a frase “Média de preço dos últimos 3 produtos: [média de preço]”. Todos os dados
devem ser mostrados na saída padrão do console (console.log).
*/

// Tempo: 12h16 até 12h32

const Bacon = require('baconjs');

const productsStream = 
  Bacon
    .fromPoll(10000, () => Math.floor(Math.random() * 100) + 1)
    .flatMapConcat((productId) => {
      const url = `https://dummyjson.com/products/${productId}`;

      return Bacon.fromPromise(fetch(url))
        .flatMapConcat((response) => Bacon.fromPromise(response.json()));
      })

productsStream.onValue((product) => console.log(product))

const slidingWindowStream = productsStream.slidingWindow(3);

slidingWindowStream.onValue((products) => {
  const sum = products.reduce((total, product) => {
    return total + Number(product.price)
  }, 0);
  
  const average = sum / (products.length || 1);
  
  console.log(`Média de preço dos últimos 3 produtos: ${average.toFixed(2)}`);
});