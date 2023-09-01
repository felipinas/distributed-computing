/* Utilizando o endpoint https://jsonplaceholder.typicode.com/users/[id], onde id varia de 1 a 10,
escreva um código reativo para realizar um consumo de todos os dados de usuários (1-10) no formato
JSON, sendo que cada requisição deve ser sucedido de um intervalo de tempo (delay) de 3 segundos
(isto é, deve haver um intervalo de 3 segundos entre as requisições). Os dados dos 10 usuários devem
ser mostrados na saída padrão do console (console.log). */

/* Tempo: 10h20 até 10h55 */

const Bacon = require('baconjs');

Bacon.fromArray([1, 2 ,3 ,4 ,5 ,6 , 7, 8, 9, 10])
  .flatMapConcat((id) => {
    return Bacon.fromPromise(fetch(`https://jsonplaceholder.typicode.com/users/${id}`))
      .flatMap((response) => Bacon.fromPromise(response.json()))
      .delay(3000);
    })
  .onValue((user) => console.log(user));
