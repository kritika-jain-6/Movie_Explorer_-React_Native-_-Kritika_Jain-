import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Subscription from '../screen/Subscription';
import PaymentCard from '../screen/PaymentCard';

import MovieDetailScreen from '../screen/MovieDetailScreen';

const Stack = createNativeStackNavigator();

export default function SubscriptionStack() {
  return (
    <Stack.Navigator initialRouteName="Subscription">
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentCard"
        component={PaymentCard}
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
