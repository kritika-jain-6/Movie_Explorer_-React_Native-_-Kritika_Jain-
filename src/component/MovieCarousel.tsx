import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { getMovieDetails } from '../api/MovieAPI';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getMovieDetails();
        if (movieData?.movies) {
          setMovies(movieData.movies);
        } else {
          throw new Error('Movies data is undefined or invalid');
        }
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" testID="loading-indicator" />
        <Text>Loading movies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        loop
        autoPlay
        width={width}
        height={500}
        data={movies}
        scrollAnimationDuration={5000}
        mode="parallax"
        renderItem={({ item }: any) => (
          <TouchableOpacity onPress={() => navigation.navigate('SearchResults', { movie: item })}>
            <View style={styles.card}>
              <ImageBackground
                source={{ uri: item.poster_url }}
                style={styles.image}
                imageStyle={{ borderRadius: 12 }}
                resizeMode="contain"
              >
                <View style={styles.overlay}>
                  <Text style={styles.title}>{item?.title}</Text>
                  <Text style={styles.meta}>
                    {`${item?.genre} | ⭐ ${item?.rating} | ${item?.release_year}`}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -90,
  },
  card: {
    width: width * 0.9,
    height: 550,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  meta: {
    color: '#ddd',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default MovieCarousel;
