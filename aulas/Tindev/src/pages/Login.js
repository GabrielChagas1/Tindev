import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Text, Platform} from 'react-native';
import logo from '../assets/logo.png';

import api from '../services/api';


function Login({navigation}){
    const [user, setUser] = useState('');


    async function handleLogin(){
        const response = await api.post('/devs', {username: user});
        const {_id} = response.data;
        console.log(_id);
        navigation.navigate('Main', {_id});
    }

    return(
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS == 'ios'}
            style={styles.container}
        >
            <Image source={logo} />
            <TextInput 
                placeholder="Digite seu usuário do Github"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
       flex: 1,
       backgroundColor: '#f5f5f5',
       alignItems: 'center',
       justifyContent: 'center',
       padding: 30
    },
    input:{ 
      height: 46,
      alignSelf:'stretch',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',  
      borderRadius: 4,
      marginTop:20,
      paddingHorizontal: 15
    },
    button:{
        height: 46,
        backgroundColor: '#df4723',
        alignSelf: 'stretch',
        borderRadius: 4,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        fontSize: 16,
        color:'#fff',
        fontWeight: 'bold'

    }

});
export default Login;