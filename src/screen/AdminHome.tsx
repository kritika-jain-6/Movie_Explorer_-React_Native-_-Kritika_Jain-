import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,

  ActivityIndicator,
} from 'react-native';
import { Toast } from 'toastify-react-native';
import AddMovieModal from '../component/Addmodal';
import {
  addMovie,
  updateMovie,
  deleteMovie,
  getMovies,
} from '../api/AdminApi';

const icons = {
  add: 'https://cdn-icons-png.flaticon.com/512/1828/1828817.png', // plus icon
  edit: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png', // pencil
  delete: 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png', // trash
  avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', // avatar
};

const AdminHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [movies, setMovies] = useState<{ id: string; title: string; year: string; poster: string }[]>([]);
  const [page, setPage] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editingMovie, setEditingMovie] = useState<{ id: string; title: string; year: string; poster: string } | null>(null);

  const fetchMovies = useCallback(async () => {
    if (loading || !hasMore) {return;}
    setLoading(true);
    try {
      const data = await getMovies();
      if (data.movies && data.movies.length > 0) {
        setMovies((prev) => [...prev, ...data.movies]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      Toast.error('Error Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovie = async (movie: { id: string; title: string; year: string; poster: string }) => {
    try {
      const newMovie = await addMovie(movie);
      setMovies((prev) => [newMovie, ...prev]);
      setModalVisible(false);
    } catch (error) {
      Toast.error('Error Failed to add movie');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      Toast.error('Error Failed to delete movie');
    }
  };

  const handleEdit = (movie: { id: string; title: string; year: string; poster: string }) => {
    setEditingMovie(movie);
    setModalVisible(true);
  };

  const handleEditMovie = async (updatedMovie: { id: string; title: string; year: string; poster: string }) => {
    try {
      const updated = await updateMovie(updatedMovie);
      setMovies((prev) =>
        prev.map((m) => (m.id === updated.id ? updated : m))
      );
      setModalVisible(false);
    } catch (error) {
      Toast.error('Error Failed to update movie');
    }
  };

  const renderMovie = ({ item }: { item: { id: string; title: string; release_year: string; poster_url: string } }) => (
    <View style={styles.movieCard}>
      <Image
        source={{ uri: item.poster_url }}
        style={styles.poster}
        resizeMode="cover"

      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieYear}>{item.release_year}</Text>
      </View>
      <View style={styles.movieActions}>
        <TouchableOpacity onPress={() => handleEdit({
          id: item.id,
          title: item.title,
          year: item.release_year,
          poster: item.poster_url,
        })}>
          <Image source={{ uri: icons.edit }} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Image source={{ uri: icons.delete }} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Movie Admin</Text>
        <Image source={{ uri: icons.avatar }} style={styles.avatar} />
      </View>

      {/* Add Movie Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add New Movie</Text>
      </TouchableOpacity>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statText}>Total Movies: {movies.length}</Text>
        </View>
      </View>

      {/* Recent Activities Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Activities</Text>
      </View>

      {/* Movie List */}
      <FlatList
        data={movies.map(movie => ({
          id: movie.id,
          title: movie.title,
          release_year: movie.year,
          poster_url: movie.poster,
        }))}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={fetchMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator color="#fff" /> : null}
        renderItem={renderMovie}
        contentContainerStyle={styles.movieListContainer}
      />

      {/* Modal */}
      <AddMovieModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddMovie}
        onEdit={handleEditMovie}
        movie={editingMovie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 16, paddingTop: 32 },

  // Header Styling
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  avatar: { width: 32, height: 32, borderRadius: 16 },

  // Add Button Styling
  addButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
  },
  addButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },

  // Stats Section
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    backgroundColor: '#3B82F6',
  },
  statText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  // Movie List Section
  movieListContainer: {
    paddingBottom: 30,
  },
  movieCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 5,
  },
  poster: { width: 70, height: 100, borderRadius: 8 },
  movieInfo: { flex: 1, marginLeft: 12 },
  movieTitle: { fontWeight: 'bold', fontSize: 18, color: '#fff' },
  movieYear: { color: '#aaa', fontSize: 14 },
  movieActions: { flexDirection: 'row', alignItems: 'center' },
  actionIcon: { width: 20, height: 20, marginLeft: 12, tintColor: '#ccc' },

  // Footer Styling
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
});

export default AdminHome;
