import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';


//create switch navigator serve para o usuário não ficar navegando entre as páginas


export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
);