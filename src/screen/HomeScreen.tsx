import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, { useEffect} from 'react';
import Card from '../component/Card';
import MovieCarousel from '../component/MovieCarousel';
import BornCard from '../component/BornCard';
import Explore from '../component/Explore';
import Footer from '../component/Footer';
import { Toast } from 'toastify-react-native';
import { getUser } from '../api/AuthAPI';
import MovieCard from '../component/MovieCard';

const Home = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
         await getUser();
      } catch (error) {
        Toast.error('Error fetching user data:');
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
        <MovieCard/>
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
