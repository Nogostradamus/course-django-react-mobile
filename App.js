import React from 'react';
import Auth from './components/auth';
import MovieList from './components/list';
import Detail from './components/detail';
import Edit from './components/edit';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
  Auth: {screen: Auth},
  MovieList: {screen: MovieList},
  Detail: {screen: Detail},
  Edit: {screen: Edit},
})

const App = createAppContainer(AppNavigator);

export default App;
