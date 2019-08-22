import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import './Main.css'

import api from '../services/api';

import logo from '../assets/logo.svg';//importando a logo
import like from '../assets/like.svg';//importando a logo
import dislike from '../assets/dislike.svg';//importando a logo
import itsamatch from '../assets/itsamatch.png'//importando logo do match

export default function Main({ match }){
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers:{
                    user: match.params.id,
                }
            })
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);


    useEffect(() =>{//responsável por conectar no socket.io
        const socket = io('http://localhost:3333', {
            query:{user: match.params.id},
        });

        socket.on('match', dev => {
            // console.log(dev);
            setMatchDev(dev);
        })
    }, [match.params.id])//toda vez que mudar o id da pessoa que acessar ele deve carregar de novo

    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id},
        })
        setUsers(users.filter(user => user._id !== id));//filtrando os usuários    }
    }

    async function handleDislike(id){
       await api.post(`/devs/${id}/dislikes`, null, {
           headers: { user: match.params.id},
       })
       setUsers(users.filter(user => user._id !== id));//filtrando os usuários
    }


    return(
      <div className="main-container">
          <img src={logo} alt="Tindev" />
          <Link to="/"><button className="loggout">Sair</button></Link>
          { users.length > 0 ? (
              <ul>
                  {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt="Foto Dev" />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={() => handleDislike(user._id)}>
                                <img src={dislike} alt="Dislike"/>
                            </button>
                            <button type="button" onClick={() => handleLike(user._id)}>
                                <img src={like} alt="Like"/>
                            </button>
                        </div>
                    </li>
                ))}
              </ul>
          ) : <div className="empty"> Acabou :(</div>}

        { matchDev &&(
           <div className="match-container">
               <img src={itsamatch} alt="it´s a match" />
               <img src={matchDev.avatar} alt="avatar" className="avatar" />
               <strong>{matchDev.name}</strong>
               <p>{matchDev.bio}</p>
               <button type="button" onClick={() => setMatchDev(null)}>Fechar</button>
            </div>
        )}
      </div>
    );
}