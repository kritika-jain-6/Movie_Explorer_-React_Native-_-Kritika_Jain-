import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screen/SearchScreen';
import MovieDetailScreen from '../screen/MovieDetailScreen';

const Stack = createNativeStackNavigator();

export default function SearchNavigation() {
  return (

      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchResults" component={MovieDetailScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}
