const axios = require('axios'); //importando o axios, para fazer a conexão com a api do github

const Dev = require('../models/Dev');

module.exports = {

    async index(req, res){
        const { user } = req.headers;
        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and:[
                { _id: { $ne: user } },//eliminar os usuários com o id do usuário logado
                { _id: { $nin: loggedDev.likes } },//eliminar os usuários que ele já deu like
                { _id: { $nin: loggedDev.dislikes } }//eliminar os usuários que ele já deu dislike
            ]
        })
        return res.json(users);
    },

    async store(req, res){
        const { username } = req.body;//recuperando o user do github

        const userExists = await Dev.findOne({ user: username});//faz a verificação no banco para vê se já tem esse user cadastrado

        if(userExists){
            return res.json(userExists);//se existir ele apenas retorna os dados do usuário
        }

        const response = await axios.get(`https://api.github.com/users/${username}`); //fazendo a chamada a api e salvando a resposta

        const { name, bio, avatar_url: avatar } = response.data; 

        const dev = await Dev.create({//recuperando as informações e criando um novo dev
            name: name,
            user: username,
            bio: bio,
            avatar: avatar
        });

        return res.json(dev);
    } 
}