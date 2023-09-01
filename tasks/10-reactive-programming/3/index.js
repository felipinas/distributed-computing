/* 
Utilize o endpoint https://dummyjson.com/products/[product_id], onde product_id varia entre 1 a
100, para fazer um consumo aleatório de produtos (simulando, por exemplo, um feed de promoções
buscando produtos aleatoriamente). O product_id deve ser gerado aleatoriamente (isto é, deve ser um
número entre 1 e 100) sempre num intervalo de 10 segundos (para que o usuário possa apreciar os
dados de cada produto/requisição) gerando assim uma stream de ids aleatórios. Os dados (produtos)
devem ser mostrados na saída padrão do console (console.log).
*/

/* Tempo: 11h55 até 12h15 */

const Bacon = require('baconjs');

Bacon
  .fromPoll(10000, () => Math.floor(Math.random() * 100) + 1)
  .flatMapConcat((productId) => {
    const url = `https://dummyjson.com/products/${productId}`;

    return Bacon.fromPromise(fetch(url))
            .flatMapConcat((response) => Bacon.fromPromise(response.json()));
    })
  .onValue((product) => console.log(product));

fetchRandomProducts();
