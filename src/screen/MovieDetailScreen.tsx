import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useWatchlist } from '../context/Watchlist';

interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: string;
  release_year: string;
  duration: string;
  poster_url: string;
  description: string;
}

const MovieDetailScreen = ({ route }: { route: RouteProp<any> }) => {
  const { movie } = route.params as { movie: Movie };
  const navigation = useNavigation();
  const [added, setAdded] = useState(false);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistToggle = () => {
    setAdded(prev=>!prev);
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
    // navigation.navigate('WatchList');
  };
  return (
    <View style={styles.container}>
      <ScrollView>
      <TouchableOpacity
  style={styles.backButton}
  onPress={() => navigation.goBack()}

>
  <View style={styles.overlay}>
    <Image
      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png' }}
      style={styles.icon}
    />
  </View>
</TouchableOpacity>

        <Image source={{ uri: movie.poster_url }} style={styles.detailPoster} />

        <Text style={styles.detailTitle}>{movie.title}</Text>
        <Text style={styles.detailGenre}>{movie.genre}</Text>
        <Text style={styles.detailGenre}>⭐ {movie.rating}/10</Text>
        <Text style={styles.detailGenre}>Year: {movie.release_year}</Text>
        <Text style={styles.detailGenre}>Duration: {movie.duration} min</Text>
        <Text style={styles.detailDescription}>{movie.description}</Text>

        <TouchableOpacity style={styles.watchlistButton} onPress={handleWatchlistToggle} testID="watchlist-button">
          <Text style={styles.watchlistText}>
            {added ? 'Remove from Watchlist' : 'Add to Watchlist'  }
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
    borderRadius: 20,
    top: 0,
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  detailPoster: {
    width: '100%',
    height: 520,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  detailGenre: { fontSize: 18, color: '#ccc', marginBottom: 10 },
  detailDescription: {
    color: '#eee',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  watchlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#FFD700',
  },
  watchlistText: { color: '#000', fontSize: 16 },
});

export default MovieDetailScreen;
