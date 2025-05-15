import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import celebrities from '../data/Celebrities';
const { width: screenWidth } = Dimensions.get('window');


const BornCard = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView} testID="celebrity-scrollview">
        {celebrities.map((celebrity) => (
          <TouchableOpacity key={celebrity.id} style={styles.card} testID={`celebrity-card-${celebrity.id}`}>
            <Image source={{ uri: celebrity.image }} style={styles.image} testID={`celebrity-image-${celebrity.id}`} />
            <Text style={styles.name} testID={`celebrity-name-${celebrity.id}`}>{celebrity.name}</Text>
            <Text style={styles.age} testID={`celebrity-age-${celebrity.id}`}>{celebrity.age}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    color: '#FFD700',
    fontSize: 24,
    marginVertical: 20,
  },
  scrollView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    width: screenWidth * 0.35,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  age: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default BornCard;
