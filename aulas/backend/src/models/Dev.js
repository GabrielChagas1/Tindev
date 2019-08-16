const { Schema, model} = require('mongoose');

const DevSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',//referenciando a tabelas de devs
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',//referenciando a tabelas de devs 
    }],

}, {
    timestamps: true,
});//criando o modelo dá tabela dev

module.exports = model('Dev', DevSchema);//exportando esse schema para poder manipular essa tabela