import React, {useState} from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Toast} from 'toastify-react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../api/AuthAPI';

const SplashScreen = ({navigation}: {navigation: StackNavigationProp<any>}) => {
  const [user, setUser] = useState();

  const handleStart = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      if (token) {
        const res = await getUser();
        setUser(res);
        navigation.navigate('MainTabs');
      } else {
         navigation.navigate('Login');
      }
    } catch (error) {
      Toast.error('Error fetching user data:');
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/background.jpg')}
      resizeMode="cover"
      testID="splash-background">
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
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});
