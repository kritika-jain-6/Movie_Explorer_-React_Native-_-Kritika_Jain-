import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getMovieDetails } from '../api/MovieAPI';
import { Toast } from 'toastify-react-native';
import streamingServices from '../data/StreamingServices'
const { width } = Dimensions.get('window');



type StreamingService = {
  id: string;
  name: string;
  imageUrl: string;
};

type Movie = {
  id: string;
  title: string;
  streaming_platform: string;
  poster_url: string;
  premium:boolean;
};

type RootStackParamList = {
  MovieDetailScreen: { movie: Movie };
};

const StreamingServiceItem = ({
  service,
  selectedId,
  onSelect,
}: {
  service: StreamingService;
  selectedId: string;
  onSelect: (id: string) => void;
}) => {
  const isSelected = selectedId === service.id;

  return (
    <TouchableOpacity onPress={() => onSelect(service.id)}>
      <View
        style={[
          styles.streamingItem,
          isSelected && styles.streamingItemSelected,
        ]}
      >
        <Image
          source={{ uri: service.imageUrl }}
          style={styles.streamingImage}
          resizeMode="cover"
        />
        <Text
          style={[styles.serviceName, isSelected && styles.serviceNameSelected]}
        >
          {service.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Explore = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('1');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getMovieDetails();
        setMovies(movieData.movies);
      } catch (err: any) {
        Toast.error('Error fetching movies');
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (selectedPlatform) {
      const platformName = streamingServices.find(
        service => service.id === selectedPlatform
      )?.name;
      const filtered = movies.filter(
        movie => movie.streaming_platform === platformName
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [selectedPlatform, movies]);

  return (
    <View style={styles.container}>
      <FlatList
        data={streamingServices}
        renderItem={({ item }) => (
          <StreamingServiceItem
            service={item}
            selectedId={selectedPlatform}
            onSelect={setSelectedPlatform}
          />
        )}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.streamingList}
      />

      <FlatList
        data={filteredMovies}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetailScreen', { movie: item })}
          >
            <View style={styles.movieItem}>
              <Image
                source={{ uri: item.poster_url }}
                style={styles.moviePoster}
                resizeMode="cover"
              />
                {item.premium && (
                        <View style={{ position: 'absolute', top: 5,left:2}}>
                          <Text style={{ color: '#fff', backgroundColor: '#FFD700', padding: 5 }}>
                            Premium
                          </Text>
                         </View>)}
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  streamingList: {
    paddingVertical: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  streamingItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  streamingItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
    paddingBottom: 4,
  },
  streamingImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  serviceName: {
    color: '#ccc',
    fontSize: 19,
    marginTop: 6,
    textAlign: 'center',
  },
  serviceNameSelected: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieList: {
    paddingHorizontal: 10,
  },
  movieItem: {
    flex: 1,
    margin: 10,
    alignItems: 'flex-start',
  },
  moviePoster: {
    width: width * 0.4,
    height: width * 0.6,
    borderRadius: 8,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default Explore;
