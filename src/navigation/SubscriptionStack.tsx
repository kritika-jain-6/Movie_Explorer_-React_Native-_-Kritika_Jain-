import React from 'react';
import Subscription from '../screen/Subscription';
import PaymentCard from '../screen/PaymentCard';

import MovieDetailScreen from '../screen/MovieDetailScreen';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {SubscriptionStackParamList} from '../types/types';
import Success from '../screen/Success';
import Cancel from '../screen/Cancel';

const Stack = createNativeStackNavigator<SubscriptionStackParamList>();

export default function SubscriptionStack() {
  return (
    <Stack.Navigator
      initialRouteName="Subscription"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="PaymentCard" component={PaymentCard} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />

      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="Cancel" component={Cancel} />
    </Stack.Navigator>
  );
}
