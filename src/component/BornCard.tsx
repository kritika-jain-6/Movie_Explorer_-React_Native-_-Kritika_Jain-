import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const celebrities = [
  {
    id: 1,
    name: 'Shah Rukh Khan',
    age: 58,
    image: 'https://www.hollywoodreporter.com/wp-content/uploads/2024/08/Shah-Rukh-Khan-Final-Getty-H-2024.jpg?w=1296&h=730&crop=1',
  },
  {
    id: 4,
    name: 'Deepika Padukone',
    age: 38,
    image: 'https://www.livemint.com/lm-img/img/2024/02/14/original/Deepika_Padukone_BAFTA_2024_Presenter_1707897095641.jpg',
  },
  {
    id: 5,
    name: 'Priyanka Chopra',
    age: 43,
    image: 'https://www.aljazeera.com/wp-content/uploads/2022/10/2021-02-10T000000Z_1391928561_RC2RPL9ASHTD_RTRMADP_3_PEOPLE-PRIYANKA-CHOPRA-JONAS.jpg?resize=1920%2C1440',
  },
  {
    id: 7,
    name: 'Leonardo DiCaprio',
    age: 49,
    image: 'https://variety.com/wp-content/uploads/2023/05/GettyImages-1492284655.jpg?w=1024',
  },
  {
    id: 8,
    name: 'Brad Pitt',
    age: 60,
    image: 'https://variety.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-22-at-10.08.26-AM.png',
  },
  {
    id: 10,
    name: 'Meryl Streep',
    age: 75,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuC3Fy3An22kSyfIsLBK4shleChG6DGZLXPg&s',
  },
  {
    id: 9,
    name: 'Tom Cruise',
    age: 61,
    image: 'https://www.spectator.co.uk/wp-content/uploads/2022/06/GettyImages-1398214825.jpg',
  },
  {
    id: 11,
    name: 'Scarlett Johansson',
    age: 40,
    image: 'https://fandomwire.com/wp-content/uploads/2021/08/a-scarlett-johansson-oscars-tout.jpg',
  },
  {
    id: 12,
    name: 'Jennifer Lawrence',
    age: 33,
    image: 'https://people.com/thmb/milnjoq8mVlP6EJPCPF-I7gl1cg=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(739x269:741x271)/Jennifer-lawrence-wwd-honors-new-york-102423_0624-379acb55a9644c3d8825e48f5edf764a.jpg',
  },
];

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
