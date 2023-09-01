# asb-gpt

### Em Desenvolvimento



## Documentação da Classe GPT

OBS: Não gosta de ler? Vá para o final do documento e leia o codigo de exemplo.

A classe GPT é usada para se comunicar com a API OFICIAL disponibilizado OpenAI e tem vários métodos úteis para enviar solicitações de bate-papo e gerenciar o histórico de mensagens.

### Construtor

O construtor da classe GPT recebe um objeto de configuração com as seguintes propriedades:

```tsx
{
  apikey: string, // uma chave de API 
  history?: boolean, // um valor booleano que indica se o histórico de mensagens deve ser mantido (padrão é verdadeiro)
  model?: string, // o nome do modelo, por exemplo: gpt-3.5-turbo (padrão é "gpt-3.5-turbo")
  max_tokens?: number, // o número máximo de tokens que podem ser gerados em uma solicitação de bate-papo (padrão é 500)
}
```
Observe que quanto maior o numero de tokens, maior é a capacidade de texto na resposta, porém o custo de uso pode ser maior.
Também é possivel consultar os modelos disponiveis pela openAI, mas de acordo com a v1 da biblioteca, ainda não é possivel setar o link das API, portanto nem todos estão disponiveis para uso.
```tsx
//Usando axios

const axios = require('axios');

const OPENAI_API_KEY = 'SUA_CHAVE_DE_API'; // Substitua pela sua chave de API

const config = {
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
};

axios.get('https://api.openai.com/v1/models', config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

```

```tsx
//Usando fetch

const fetch = require('node-fetch'); // Certifique-se de instalá-lo via npm ou yarn

const OPENAI_API_KEY = 'SUA_CHAVE_DE_API'; // Substitua pela sua chave de API

const url = 'https://api.openai.com/v1/models';

const headers = {
  Authorization: `Bearer ${OPENAI_API_KEY}`,
};

fetch(url, { method: 'GET', headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

```

```bash
#usando curl

curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

```

[Consulte o preço de cada modelo aqui](https://openai.com/api/pricing)


## Métodos

### setHistory

O método `setHistory` é usado para adicionar uma mensagem ao histórico de mensagens. Ele recebe um objeto de mensagem com as seguintes propriedades:

```tsx
{
  role: "user" | "system", // o papel da mensagem
  content: string // o conteúdo da mensagem
}

```

Se `historyLength` também for fornecido, ele definirá o comprimento do histórico de mensagens (padrão é 20).

```tsx
setHistory(message: { role: "user" | "system", content: string }, historyLength?: number): void

```

### getHistory

O método `getHistory` retorna o histórico de mensagens como uma matriz de objetos de mensagem.

```tsx
getHistory(): { role: "user" | "system", content: string }[]

```

### clearHistory

O método `clearHistory` limpa o histórico de mensagens e adiciona a mensagem padrão.

```tsx
clearHistory(): void

```

### defaultRequestChat

O método `defaultRequestChat` é usado para enviar uma solicitação de bate-papo padrão. Ele recebe uma string como parâmetro que contém o texto que o modelo deve gerar. Ele retorna um objeto de mensagem com as seguintes propriedades:

```tsx
{
  role: "assistent", // o papel da mensagem
  content: string // o conteúdo da mensagem
}

```

```tsx
defaultRequestChat(prompt: string): Promise<{ role: "user" | "system", content: string }>

```

### Propriedades

A classe GPT possui as seguintes propriedades:

```tsx
{
  messages: { role: "user" | "system" | "assistent", content: string }[], // uma matriz que contém o histórico de mensagens
  apiKey: string, // a chave de API
  history: boolean, // um valor booleano que indica se o histórico de mensagens deve ser mantido
  model: string, // o nome do modelo GPT-3.5-Turbo
  max_tokens: number, // o número máximo de tokens que podem ser gerados em uma solicitação de bate-papo
  historyLength: number, // o comprimento do histórico de mensagens
  defaultContentMessage: string, // a mensagem padrão
  defaultConfig: { model: string, max_tokens: number } // a configuração padrão para as solicitações de bate-papo
}

```

### Exemplo de uso

```tsx
import { GPT } from "./gpt";
require('dotenv').config()

const gpt = new GPT({ apikey: process.env.API_KEY });

gpt.setHistory({ role: "system", content: "Você sempre termina um texto com !!!" });

const res = await gpt.defaultRequestChat("Como você está?");

console.log(res); // { role: "system", content: "Estou bem, e você? !!!" }

```

Neste exemplo, a classe `GPT` é importada do módulo `gpt.ts`. É criada uma instância da classe, passando a chave de API do modelo GPT-3.5-Turbo como parâmetro. Em seguida, é adicionada uma mensagem ao histórico de mensagens usando o método `setHistory` e é feita uma solicitação de bate-papo padrão usando o método `defaultRequestChat`. O resultado é registrado no console.



## Codigo De Exemplo

```tsx
import { ChatConfig, ChatMessage, ConfigGPT, GPT } from "./src/asb-gpt";
require("dotenv").config();

function waitForFiveSeconds() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("A ação foi realizada após 5 segundos!");
    }, 5000); // 5000 milissegundos = 5 segundos
  });
}

// Função de teste para o método setHistory e getHistory
async function testSetHistory() {
  const config = {
    apikey: process.env.KEY,
  };

  const gpt = new GPT(config);

  const historyLength = 10;

  gpt.setHistory(
    { role: "system", content: "your not speak english!" },
    historyLength
  );

  gpt.setHistory({ role: "assistant", content: "Hi there!" }, historyLength);
  gpt.setHistory({ role: "user", content: "How are you?" }, historyLength);

  console.log("Messages:" + "\n" + gpt.getHistory());
}

//limpando o historico
function testclearHistory() {
  const gpt = new GPT({ apikey: process.env.KEY });
  gpt.clearHistory(); //Metodo void
}

// Função de teste para o método defaultRequestChat
async function testDefaultRequestChat() {
  const options: ConfigGPT = {
    history: true /*Opcional */,
    model: "gpt-3.5-turbo" /*Opcional */,
    max_tokens: 200 /*Opcional */,
    apikey:
      process.env
        .KEY /*Obrigatorio, caso omitido, será retornado um erro da API*/,
  };

  const gpt = new GPT(options);

  const messages = [
    "olá",
    "meu nome é igor",
    "Vou te chamar de IA, tudo certo?",
    "qual seu nome?",
  ];

  for (let i = 0; i < messages.length; i++) {
    const element = messages[i];

    try {
      console.log(gpt.getHistory()); // mostrando o historico
      const response = await gpt.defaultRequestChat(element);
      console.log("Response:", response);
      console.log("\n");

      await waitForFiveSeconds(); // aguardando 5 segundos
    } catch (error) {
      console.error("Erro:", error);
    }
  }
}

// Função de teste para o método requestChat
async function testRequestChat() {
  const gpt = new GPT({ apikey: process.env.KEY });

  const customConfig: ChatConfig = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Você não fala ingles, apenas portugues" },
      { role: "assistant", content: "Sure, here's a fun fact!" },
      { role: "user", content: "Tell me something interesting." },
    ],
  };

  try {
    const response = await gpt.requestChat(customConfig);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function explicacao() {
  //importe o gpt com import {GPT} from "asb-gpt";

  /*
        ChatMessage {
            role: string;
            content: string;
        }
    */

  /*
        ChatConfig {
            model: string;
            messages?: ChatMessage[];
            temperature?: number;
            max_tokens?: number;
            top_p?: number;
            frequency_penalty?: number;
            presence_penalty?: number;

        }
    */

  /*
        ConfigGPT = {
            history?: boolean | undefined;
            model?: string | undefined;
            max_tokens?: number | undefined;
            apikey: string | undefined;
        }
    */

  const config: ConfigGPT = {
    apikey: process.env.Key, // Ou "chave_api_key"
    history: true,
    model: "gpt-3.5-turbo",
    max_tokens: 500,
  };
  // Apenas API Key obrigatorio, caso for utilizar defaultRequestChat.
  // Para Utilizar requestChat, deixar tudo menos API key default para melhor legibilidade

  const gpt = new GPT(config); /*Criando instancia */

  gpt.setHistory(
    { role: "system", content: "você é um assistente prestativo" },
    20 /*<-- historyLength*/
  );
  gpt.setHistory(
    {
      role: "assistent",
      content: "eu sou um assistente prestativo",
    },
    50
  );
  gpt.setHistory({
    role: "system",
    content: "você é um assistente prestativo",
  });
  //use setHistory para manipular o array de historico.
  //use um numero inteiro no historyLength para manipular o tamando do array.
  //por padrão, o tamanho é 20

  /*
    roles = {
        system: "comportamento do sistema",
        assistent: "resposta do gpt",
        user: "mensagem do usuario"
    }
  */

  gpt.getHistory(); //retorna o array de historico
  gpt.clearHistory(); // retorna o array para o valor default.

  const respostaPadrao = async () => await gpt.defaultRequestChat("Olá");
  /*
    chame de forma assincrona o metodo defaultRequestChat(body: string)
    para fazer uma requisição com os valores passados no construtor da classe.
    Use os getters para manipular os atributos da classe.
    OBS: Metodo mais lento e pesado. Retorno na tipagem da função.
  */

  const options: ChatConfig = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant",
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const resposta = async () => await gpt.requestChat(options);
  /*
    Use requestChat(config: ChatConfig) para uma requisição personalizada.
    Metodos getters não funcionam nesse metodo, crie sua propia logica!
    Para manter o historico, faça o push dos dados no array messages.
    OBS: Respeite a tipagem e evite problemas.
  */
}

// Chame as funções de teste aqui
//testSetHistory();
//testDefaultRequestChat();
//testRequestChat();

```
