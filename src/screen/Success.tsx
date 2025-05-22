import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Success = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/done.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Subscription Successful</Text>
      <Text style={styles.subtitle}>Welcome to the Binge Premium Movies</Text>
      <Text style={styles.subtitle}>Your premium plan starts today</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD400', // Yellow
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.85,
    marginBottom: 6,
    textAlign: 'center',
  },
  button: {
    marginTop: 36,
    backgroundColor: '#FFD400', // Yellow
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#FFD400',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});