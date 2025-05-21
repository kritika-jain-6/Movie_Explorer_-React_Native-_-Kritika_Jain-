import React, { useEffect, useState } from 'react';
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
import { fetchUserSubscription } from '../api/SubscriptionApi';

interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: string;
  release_year: string;
  duration: string;
  poster_url: string;
  description: string;
  premium: boolean;
}

interface MovieDetailScreenRouteParams {
  movie: Movie;
}

interface MovieDetailScreenProps {
  route: RouteProp<Record<string, MovieDetailScreenRouteParams>, string>;
}

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ route }) => {
  const { movie } = route.params;
  const navigation = useNavigation();
  const [added, setAdded] = useState(false);
  const [isPremiumLocked, setIsPremiumLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    setAdded(isInWatchlist(movie.id));
  }, [movie.id]);

  useEffect(() => {
    const checkAccess = async () => {
      if (movie.premium) {
        const subData = await fetchUserSubscription();
        if (subData.plan_type !== 'premium') {
          setIsPremiumLocked(true);
        }
      }
      setLoading(false);
    };
    checkAccess();
  }, [movie]);

  const handleWatchlistToggle = () => {
    if (added) {
      removeFromWatchlist(movie.id);
    } else {
      navigation.navigate('WatchList');
      addToWatchlist(movie);
    }
    setAdded(!added);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (isPremiumLocked) {
    return (
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.overlay}>
            <Image
              source={require('../assets/back-arrow.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        {/* Premium Lock Message */}
        <View style={styles.lockedContent}>
          <Text style={styles.lockedText}>
            Premium content — please subscribe to watch.
          </Text>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => navigation.navigate('SubscriptionStack')}
          >
            <Text style={styles.subscribeButtonText}>Go to Subscription</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.overlay}>
            <Image
              source={require('../assets/back-arrow.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        <Image source={{ uri: movie.poster_url }} style={styles.detailPoster} />

        <Text style={styles.detailTitle}>{movie.title}</Text>
        <Text style={styles.detailGenre}>{movie.premium ? 'Premium' : 'Free'}</Text>
        <Text style={styles.detailGenre}>{movie.genre}</Text>
        <Text style={styles.detailGenre}>⭐ {movie.rating}/10</Text>
        <Text style={styles.detailGenre}>Year: {movie.release_year}</Text>
        <Text style={styles.detailGenre}>Duration: {movie.duration} min</Text>
        <Text style={styles.detailDescription}>{movie.description}</Text>

        <TouchableOpacity
          style={styles.watchlistButton}
          onPress={handleWatchlistToggle}
          testID="watchlist-button"
        >
          <Text style={styles.watchlistText}>
            {added ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
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
  detailGenre: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 10,
  },
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
  watchlistText: {
    color: '#000',
    fontSize: 16,
  },
  lockedContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  lockedText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  subscribeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieDetailScreen;
