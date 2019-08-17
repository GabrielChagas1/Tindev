const express = require('express'); //importando o express
const mongoose = require('mongoose'); //importando o mongoose
const cors = require('cors'); //importando o cors
const routes = require('./routes'); //importando o routes
const server = express(); //instanciando o express

mongoose.connect('mongodb+srv://omnistack:omnistack@rocketseat-yvk93.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});//conectando no banco de dados mongoDB

server.use(cors());//possibilita do front-end acessar os dados do node
server.use(express.json());//informando que as requisições vão ser tratadas como json
server.use(routes); //use utilizado para usar configurações de outros módulos

server.listen(3333); //configurando a porta
