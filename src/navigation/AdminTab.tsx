import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';

import AdminHome from '../screen/AdminHome';

import ProfileScreen from '../screen/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="AdminHome"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
      }}
    >
      <Tab.Screen
        name="AdminHome"
        component={AdminHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/home.png')
                  : require('../assets/home-outline.png')
              }
              style={styles.icon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/profile.png')
                  : require('../assets/profile-outline.png')
              }
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    color: 'white',
    resizeMode: 'contain',
  },
});

export default TabNavigation;
