const express = require('express'); //importando o express
const mongoose = require('mongoose'); //importando o mongoose
const cors = require('cors'); //importando o cors
const routes = require('./routes'); //importando o routes

const app = express(); //instanciando o express
const server = require('http').Server(app);
const io = require('socket.io')(server);//importando o socket

const  connectedUsers = {};

io.on('connection', socket =>{
   const {user} = socket.handshake.query;
   connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://omnistack:omnistack@rocketseat-yvk93.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});//conectando no banco de dados mongoDB

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
})

app.use(cors());//possibilita do front-end acessar os dados do node
app.use(express.json());//informando que as requisições vão ser tratadas como json
app.use(routes); //use utilizado para usar configurações de outros módulos

server.listen(3333); //configurando a porta
