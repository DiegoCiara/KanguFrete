const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
const port = 3000;

app.use(express.json());

async function getFrete(){
  const cepDestinatario  = "01153000";
   
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
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  
};


getFrete()