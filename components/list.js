import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button, AsyncStorage } from 'react-native';

export default function MovieList(props) {

  const [ movies, setMovies ] = useState([]);
  let token = null;

  const getData = async () => {
    token = await AsyncStorage.getItem('MR_Token');
    if (token) {
      getMovies();
    } else {
      props.navigation.navigate("Auth")
    }
  };
  
  useEffect(() => {
    getData();
  }, []);

  const getMovies = () => {
    console.log(token);
    fetch(`http://192.168.1.5:8000/api/movies/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then( res => res.json())
    .then( jsonRes => setMovies(jsonRes))
    .catch( error => console.log(error));
  }

  const movieclicked = (movie) => {
    props.navigation.navigate("Detail", {movie: movie, title: movie.title, token: token})
  }

  return (
    <View>
      <Image source={require('../assets/MR_logo.png')}
        style={{width: '100%', height: 135, paddingTop: 30}}
        resizeMode="contain"/>

      <FlatList 
        data={movies}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => movieclicked(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

MovieList.navigationOptions = screenProps => ({
  title: "List of movies",
  headerStyle: {
    backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:24
  },
  headerRight: (
    <Button title="Add New" color="white"
      onPress={() => screenProps.navigation.navigate("Edit", {movie: {title: '', description: ''}})}
    />
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35'
  },
  itemText: {
    color: '#fff',
    fontSize: 24
  }
});
