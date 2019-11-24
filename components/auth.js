import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';

export default function Auth(props) {

  const [ username, setUsername] = useState("");
  const [ password, setPassword] = useState("");
  const [ regView, setRegView] = useState(false);

  useEffect(()=> {
    getData();
  }, [])

  const auth = () => {
    if (regView) {
      fetch(`http://192.168.1.5:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password})
      })
      .then( res => res.json())
      .then( res => {
        setRegView(false);
      })
      .catch( error => console.log(error));
    } else {
      fetch(`http://192.168.1.5:8000/auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
        })
        .then( res => res.json())
        .then( res => {
          saveData(res.token);
          props.navigation.navigate("MovieList");
        })
        .catch( error => console.log(error));
    }
  };
  const saveData = async (token) => {
    await AsyncStorage.setItem('MR_Token', token)
  }
  const getData = async () => {
    const token = await AsyncStorage.getItem('MR_Token');
    if(token) props.navigation.navigate("MovieList");
  }
  const toggleView = () => {
    setRegView(!regView);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput 
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
        autoCapitalize={'none'}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput 
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        autoCapitalize={'none'}
      />
      <Button onPress={() => auth()} title={regView ? "Register" : "Login"} />
      <TouchableOpacity onPress={() => toggleView()}>
        {regView ? <Text style={styles.viewText}>Already have an account? Go back to login.</Text> : 
        <Text style={styles.viewText}>Don't have an account? Register here.</Text>}
      </TouchableOpacity>
    </View>
  );
}

Auth.navigationOptions = screenProps => ({
  title: "Login",
  headerStyle: {
    backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:24
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10
  },
  label: {
    fontSize: 24,
    color: 'white',
    padding: 10
  },
  input: {
    fontSize: 24,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10
  },
  viewText: {
    color: 'white',
    fontSize: 20,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  }
});
