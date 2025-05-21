import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useWatchlist } from '../context/Watchlist';
import { useNavigation } from '@react-navigation/native';

const WatchList = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigation = useNavigation();

  const handleRemoveWatchList = (id: string) => {
    removeFromWatchlist(id);
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText} testID="empty-message">Your Watchlist is empty</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          testID="back-button"
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png' }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle} testID="screen-title">My Watchlist</Text>
      </View>

      {/* Watchlist */}
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card} testID={`watchlist-card-${item.id}`}>
            <Image source={{ uri: item.poster_url }} style={styles.poster} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>{item.genre} | {item.release_year}</Text>
              <Text style={styles.rating}>⭐ {item.rating}/10</Text>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleRemoveWatchList(item.id)}
                testID={`delete-button-${item.id}`}
              >
                <Image
                  source={require('../assets/bin.png')}
                  style={styles.deleteIcon}
                />
                <Text style={styles.deleteText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#111',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
  },
  poster: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  meta: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  rating: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  deleteIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: '#fff',
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: '#ccc',
    fontSize: 18,
  },
});

export default WatchList;
