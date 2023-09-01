/* Modifique o exercício 1. de modo que o código passe a consumir o seguinte endpoint
https://httpbin.org/status/[status_code], onde status code deve variar entre 401 a 410. Note que as
requisições irão gerar erros dado que as URLs retornam valores que não são JSONs mas textos. Deste
modo, modifique seu código para que cada requisição seja re-tentada ao menos 3 vezes. O objetivo é
simular o consumo de endpoints que estão temporariamente fora do ar ou que estão provendo valores
num formato não esperado (que é o caso), gerando assim problemas de parsing. Para esses casos de
erro, deverá ser emitido: “Ocorreu um erro ao requisitar o URL [mostrar URL consultada] (número de
tentativas: 3)” através do console.error(). OBS: O mesmo delay entre requisições do exercício 1. deve ser
mantido na lógica desse exercício também. */

/* Tempo: 10h55 até 11h52 */

const Bacon = require('baconjs');

Bacon.fromArray([401, 402, 403, 404, 405, 406, 407, 408, 409, 410]) 
    .flatMapConcat((statusCode) => {
      return Bacon.retry({
        source: (attemptNumber) => {
          const url = `https://httpbin.org/status/${statusCode}`;
          
          return Bacon.fromPromise(fetch(url))
            .flatMapConcat((response) => {
              if (response.status === 200) {
                return Bacon.fromPromise(response.text());
              } 
              
              return new Bacon.Error(`Erro ao requisitar o URL ${url}, tentativa ${attemptNumber + 1}`);
            })
        },
        retries: 2,
        delay: () => 3000,
        isRetryable: (error) => {
          console.log(error);

          return true; 
        },
      })
    })
    .onValue((response) => {
      console.log(response);
    });
