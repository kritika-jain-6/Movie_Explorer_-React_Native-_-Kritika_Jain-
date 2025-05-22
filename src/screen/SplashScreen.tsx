import React from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import {Toast} from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../api/AuthAPI';
import { RootStackParamList } from '../types/types';
import { NavigationProp } from '@react-navigation/native';


type Props={
  navigation: NavigationProp<RootStackParamList>;
}

const SplashScreen :React.FC<Props> =({navigation})=> {
  const handleStart = async () => {
    console.log('Start button pressed');    
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token:', token);
      

      if (token) {
        await getUser();
        navigation.navigate('MainTabs');
        console.log(getUser());
      }else{
        navigation.navigate('Login');
      }
    } catch (error) {
      navigation.navigate('Login');
      Toast.error('Error fetching user data');
      console.log(error);
      
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/background.jpg')}
      resizeMode="cover"
      testID="splash-background">
      <View style={styles.overlay} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Logo.jpg')}
          style={styles.logo}
          testID="splash-logo"
        />
        <Text style={styles.title} testID="splash-text">
          Welcome to {"\n"}BINGE
        </Text>
      </View>
      <View style={styles.bottomContainer} testID="bottom-container">
        <TouchableOpacity
          style={styles.button}
          onPress={handleStart}
          testID="start-button">
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  logoContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  bottomContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});
