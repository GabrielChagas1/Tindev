/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, StyleSheet } from 'react-native';

function App(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
     flex: 1,
     backgroundColor: '#7159c1',
     justifyContent: 'center',
     alignItems: 'center'
  },
  text:{
    color: '#fff',
    fontSize: 50, 

  }
});

export default App;
