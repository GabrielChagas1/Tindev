import React, { useState } from 'react';

import api from '../services/api' 
import './Login.css';//importando o css
import logo from '../assets/logo.svg';//importando a logo


export default function Login({ history } ){
    const [username, setUsername] = useState('');//pesquisar sobre state react

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs', {
            username,//parametros para a api
        });

        const { _id } = response.data; 
        
        history.push(`/dev/${_id}`);//redirecionando o usuário
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/> 
                <input 
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={ e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}