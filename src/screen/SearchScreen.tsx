import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { RootStackParamList } from '../types/types';
import {NavigationProp} from '@react-navigation/native';
import {searchMovies, filterMovies} from '../api/MovieAPI';

const allCategories = [
  {label: 'Action', color: '#FF6B6B'},
  {label: 'Comedy', color: '#6BCBFF'},
  {label: 'Drama', color: '#9B59B6'},
  {label: 'Horror', color: '#2C3E50'},
  {label: 'Sci-Fi', color: '#FFA07A'},
  {label: 'Romance', color: '#FF69B4'},
  {label: 'Fantasy', color: '#00FA9A'},
  {label: 'Thriller', color: '#808080'},
];

type Props={
  navigation:NavigationProp<RootStackParamList>;
}

const SearchScreen :React.FC<Props>=({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  

 

  interface Movie {
    id?: string;
    title: string;
    poster_url: string;
  }

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const trending = await searchMovies('');
        setFilteredMovies(
          Array.isArray(trending.movies) ? trending.movies : [],
        );
      } catch {
        setFilteredMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const handleSearch = async () => {
    if (!searchText.trim()) {return;}
    setIsLoading(true);
    try {
      const results = await searchMovies(searchText);
      setFilteredMovies(Array.isArray(results.movies) ? results.movies : []);
      updateRecentSearches(searchText);
    } catch {
      setFilteredMovies([]);
    } finally {
      setIsLoading(false);
    }
    setSearchText('');
  };

const handleGenreSelect = async (genre) => {
  const genreToSearch = genre === selectedGenre ? null : genre;

  setSelectedGenre(genreToSearch);
  setIsLoading(true);

  try {
    if (!genreToSearch) {

      setFilteredMovies([]);
      return;
    }
    const results = await filterMovies(genreToSearch);
    setFilteredMovies(Array.isArray(results?.movies) ? results.movies : []);
    updateRecentSearches(genreToSearch);
  } catch (error) {
    console.error('Error fetching filtered movies:', error);
    setFilteredMovies([]);
  } finally {
    setIsLoading(false);
  }
};

  const updateRecentSearches = (query: string) => {
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  const clearAllRecentSearches = () => setRecentSearches([]);

  const navigateToDetails = (movie: any) => {
    if (movie) {
      navigation.navigate('SearchResults', {movie});
    }
  };

  const renderCategoryItem = ({item}: {item: any}) => {
    if (item.isToggle) {
      return (
        <TouchableOpacity
          style={[styles.categoryCard, {backgroundColor: '#333'}]}
          onPress={() => setShowAllCategories(!showAllCategories)}>
          <Text style={[styles.categoryText, {color: '#FFD700'}]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    }
    const isSelected = item.label === selectedGenre;
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          {backgroundColor: isSelected ? '#FFD700' : item.color || '#333'},
        ]}
        onPress={() => handleGenreSelect(item.label)}>
        <Text
          style={[styles.categoryText, {color: isSelected ? '#000' : '#fff'}]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16,marginTop:20}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png'}}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Search</Text>
      </View>

      <View style={styles.searchBar}>
        <Image
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/149/149852.png'}}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Movies, genres..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
      </View>

      {isLoading && (
        <ActivityIndicator
          color="#FFD700"
          style={{marginVertical: 20}}
        />
      )}

      {!isLoading && filteredMovies.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Search Results</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredMovies.map((item, index) => (
              <TouchableOpacity
                key={item.id || index}
                style={styles.trendingCard}
                onPress={() => navigateToDetails(item)}>
                <Image
                  source={{uri: item.poster_url}}
                  style={styles.trendingImage}
                />
                <Text style={styles.trendingTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={[
          ...(!showAllCategories ? allCategories.slice(0, 4) : allCategories),
          {
            label: showAllCategories ? 'View Less' : 'View All',
            isToggle: true,
          },
        ]}
        numColumns={2}
        keyExtractor={(item, index) => item.label + index}
        renderItem={renderCategoryItem}
        columnWrapperStyle={styles.categoryRow}
      />

      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        {recentSearches.length > 0 && (
          <TouchableOpacity onPress={clearAllRecentSearches}>
            <Text style={styles.clearAll}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {recentSearches.map((item, index) => (
        <View key={index} style={styles.recentRow}>
          <Text style={styles.recentBullet}>•</Text>
          <Text style={styles.recentText}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000', padding: 16},
  header: {fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop:10},
  categoryCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {fontSize: 16, fontWeight: 'bold', textAlign: 'center'},
  categoryRow: {justifyContent: 'space-between'},
  backButton: { left: 1, zIndex: 10, flexDirection: 'row',alignItems: 'center',justifyContent: 'center',marginTop:10},
  icon: {width: 24, height: 24, tintColor: '#fff', marginTop: 8,marginRight:10},
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
  },
  searchIcon: {width: 20, height: 20, marginRight: 10, tintColor: '#888'},
  searchInput: {fontSize: 16, color: '#fff', flex: 1},
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
  },
  trendingCard: {marginRight: 12, width: 120},
  trendingImage: {width: '100%', height: 170, borderRadius: 10},
  trendingTitle: {marginTop: 6, fontSize: 14, fontWeight: '600', color: '#ccc'},
  recentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearAll: {color: '#FF6B6B', fontSize: 14},
  recentRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  recentBullet: {fontSize: 16, marginRight: 8, color: '#FFD700'},
  recentText: {fontSize: 16, color: '#ccc'},
});

export default SearchScreen;
