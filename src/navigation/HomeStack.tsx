import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieDetailScreen from '../screen/MovieDetailScreen';
import Home from '../screen/HomeScreen';
import Explore from '../component/Explore';
import {HomeStackParamList} from '../types/types';


const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function SearchNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Explore"
        component={Explore}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieDetailScreen"
        component={MovieDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
