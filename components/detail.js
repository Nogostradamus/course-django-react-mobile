import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Detail(props) {

  const movie = props.navigation.getParam('movie', null);
  const token = props.navigation.getParam('token', '');
  const [ highlight, setHeighlight] = useState(0); 

  const rateClicked = () => {
    if(highlight > 0 && highlight < 6){
      fetch(`http://192.168.1.5:8000/api/movies/${movie.id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stars: highlight})
    })
    .then( res => res.json())
    .then( res => {
      setHeighlight(0);
      Alert.alert("Rating", res.message);
    })
    .catch( error => Alert.alert("Error", error));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <FontAwesomeIcon style={movie.avg_rating > 0 ? styles.orange : styles.white} icon={faStar}/>
        <FontAwesomeIcon style={movie.avg_rating > 1 ? styles.orange : styles.white} icon={faStar}/>
        <FontAwesomeIcon style={movie.avg_rating > 2 ? styles.orange : styles.white} icon={faStar}/>
        <FontAwesomeIcon style={movie.avg_rating > 3 ? styles.orange : styles.white} icon={faStar}/>
        <FontAwesomeIcon style={movie.avg_rating > 4 ? styles.orange : styles.white} icon={faStar}/>
        <Text style={styles.white}>({movie.no_of_ratings})</Text>
      </View>
      <Text style={styles.description}>{movie.description}</Text>

      <View style={{borderBottomColor: 'white', borderBottomWidth: 2}}/>
      <Text style={styles.description}>Rate it !!!</Text>

      <View style={styles.starContainer}>
        <FontAwesomeIcon style={highlight > 0 ? styles.purple : styles.grey} icon={faStar} size={48} onPress={()=> setHeighlight(1)}/>
        <FontAwesomeIcon style={highlight > 1 ? styles.purple : styles.grey} icon={faStar} size={48} onPress={()=> setHeighlight(2)}/>
        <FontAwesomeIcon style={highlight > 2 ? styles.purple : styles.grey} icon={faStar} size={48} onPress={()=> setHeighlight(3)}/>
        <FontAwesomeIcon style={highlight > 3 ? styles.purple : styles.grey} icon={faStar} size={48} onPress={()=> setHeighlight(4)}/>
        <FontAwesomeIcon style={highlight > 4 ? styles.purple : styles.grey} icon={faStar} size={48} onPress={()=> setHeighlight(5)}/>
      </View>
      <Button title="Rate" onPress={() => rateClicked()}/>
    </View>
  );
}

Detail.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
  headerStyle: {
    backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:24
  },
  headerRight: (
    <Button title="Edit" color="white"
      onPress={() => screenProps.navigation.navigate("Edit", {movie: screenProps.navigation.getParam("movie")})}
    />
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10
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
  },
  description: {
    fontSize: 20,
    color: 'white',
    padding: 10
  },
  starContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  orange: {
    color: 'orange'
  },
  white: {
    color: 'white'
  },
  purple: {
    color: 'purple'
  },
  grey: {
    color: '#ccc'
  }
});
