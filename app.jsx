const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/consultarFrete', async (req, res) => {
  const { cepDestinatario } = req.body;

  const data = { 
    cepOrigem: "55002506",
    cepDestino: cepDestinatario,
    vlrMerc: 155,
    pesoMerc: 1,
    volumes: [
      {
        peso: 1,
        altura: 20,
        largura: 30,
        comprimento: 40,
        tipo: "caixa",
        valor: 155,
        quantidade: 1
      }
    ],
    produtos: [
      {
        peso: 0,
        altura: 0,
        largura: 0,
        comprimento: 0,
        valor: 0,
        quantidade: 0
      }
    ],
    servicos: ["string"],
    ordernar: "string"
  }

  const config = {
    method: 'post',
    url: process.env.KANGU_URL,
    headers: { 
      'accept': 'application/json', 
      'token': process.env.KANGU_TOKEN, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
    .then(function (response) {
      // Enviar a resposta diretamente para o frontend
      res.json(response.data);
    })
    .catch(function (error) {
      // Tratar os erros e enviar uma resposta adequada para o frontend
      console.error(error);
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um status fora do intervalo de 2xx
        res.status(error.response.status).send(error.response.data);
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        res.status(500).send("O servidor não respondeu à requisição.");
      } else {
        // Algum erro ocorreu ao fazer a requisição
        res.status(500).send("Erro ao fazer a requisição: " + error.message);
      }
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
