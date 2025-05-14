import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useWatchlist } from '../context/Watchlist';
import { useNavigation } from '@react-navigation/native';

const WatchList = () => {
  const { watchlist } = useWatchlist();
  const navigation = useNavigation();

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText} testID="empty-message">Your Watchlist is empty</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          testID="back-button"
        >
          <View style={styles.overlay}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png' }}
              style={styles.icon}
            />
            <Text style={styles.screenTitle} testID="screen-title">My Watchlist</Text>
          </View>
        </TouchableOpacity>
      </View>


      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card} testID={`watchlist-card-${item.id}`}>
            <Image source={{ uri: item.poster_url }} style={styles.poster} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>{item.genre} | {item.release_year}</Text>
              <Text style={styles.rating}>⭐ {item.rating}/10</Text>
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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 1,
    zIndex: 10,
  },
  overlay: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginTop: 10,
    marginRight: 80,
    marginLeft: 0,
  },
  screenTitle: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
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
