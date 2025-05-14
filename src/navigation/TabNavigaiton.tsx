import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';

import HomeStack from '../navigation/HomeStack';
import SearchNavigation from './SearchNavigation';
import ProfileScreen from '../screen/ProfileScreen';
import SubscriptionStack from './SubscriptionStack';
import WatchList from '../screen/WatchList';


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
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
        name="Search"
        component={SearchNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/search.png')
                  : require('../assets/search-outline.png')
              }
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SubscriptionStack"
        component={SubscriptionStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/wallet.png') // Replace with actual icon
                  : require('../assets/wallet-outline.png')
              }
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchList}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/bookmark.png') // Replace with actual icon
                  : require('../assets/bookmark-outline.png')
              }
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
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
