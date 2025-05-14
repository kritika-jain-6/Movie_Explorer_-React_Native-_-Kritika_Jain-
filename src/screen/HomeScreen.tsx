import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {Component, useEffect} from 'react';
import Card from '../component/Card';
import MovieCarousel from '../component/MovieCarousel';
import BornCard from '../component/BornCard';
import Explore from '../component/Explore';
import Footer from '../component/Footer';
import {updateDeviceToken} from '../api/NotificationApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        if (token && fcmToken) {
          const res = await updateDeviceToken(fcmToken);
          console.log(res);
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      fetchUser();
    };
  }, []);
  return (
    <ScrollView testID="HomeScreen">
      <View style={styles.container}>
        <MovieCarousel />
        <Text style={styles.subHeader} testID="ExploreHeader">
          Explore What's Streaming
        </Text>
        <Explore />
        <Text style={styles.subHeader} testID="WhatToDoHeader">
          What to do
        </Text>
        <Card />
        <Text style={styles.subHeader} testID="TopTenHeader">
          Top Ten
        </Text>
        <Card />
        <Text style={styles.subHeader} testID="BornTodayHeader">
          Born Today
        </Text>
        <BornCard />
        <Footer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
  },
  subHeader: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
});

export default Home;
