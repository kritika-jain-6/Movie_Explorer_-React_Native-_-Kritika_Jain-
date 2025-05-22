import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screen/SearchScreen';
import MovieDetailScreen from '../screen/MovieDetailScreen';
import {SearchStackParamList} from '../types/types';



const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchNavigation() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={SearchScreen}
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
