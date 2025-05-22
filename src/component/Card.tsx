import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getMovieDetails } from '../api/MovieAPI';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { HomeStackParamList } from '../types/types';


const { width, height } = Dimensions.get('window');

export interface Movie {
  id: string;
  title: string;
  description:string;
  genre: string;
  rating: string;
  release_year: string;
  duration: string;
  poster_url: string;
  premium: boolean;
}

export const MovieItem = React.memo(({ item }: { item: Movie }) => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();


  return (
    <TouchableOpacity
      onPress={() =>{

        if(typeof navigation.navigate === 'function'){
          
          navigation.navigate('MovieDetailScreen', { movie: item })
        }
      }
      }
    >
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster_url }}
          style={styles.image}
          resizeMode="cover"
          accessibilityRole="image"
          accessibilityLabel={`${item.title}`}/>
        {item.premium && (
          <View style={{ position: 'absolute', top: 5,left:2}}>
            <Text style={{ color: '#fff', backgroundColor: '#FFD700', padding: 5 }}>
              Premium
            </Text>
           </View>)}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <Text style={styles.details}>
          {item.release_year} | {item.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Card = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getMovieDetails();
        setMovies(movieData.movies);
      } catch (err: any) {
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer} testID="loading">
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer} testID="error">
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="card-component">
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        testID="movie-list"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  item: {
    borderRadius: 10,
    marginRight: 15,
    width: width * 0.4,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.25,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center',
  },
  rating: {
    color: '#fff',
  },
  details: {
    color: '#fff',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Card;
