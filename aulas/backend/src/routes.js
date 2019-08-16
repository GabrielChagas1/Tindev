const express = require('express');

const DevController = require('./controllers/DevController');//importando o controller dev
const LikeController = require('./controllers/LikeController');//importando o controller like
const DislikeController = require('./controllers/DislikeController');//importando o controller dislike

const routes = express.Router();

//configurando a rota raiz
//req == requisição -> contêm todas as informações das requisições
//res == resposta -> objeto utilizado para enviar a resposta
// routes.get('/', (req, res) => {
//     //req.query.nomeParametro -> recuperar o que vem pela URL
//     return res.json({message: `Olá ${req.query.name}`});
// });

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes; //comando para exportar as routes para outras partes dá aplicação