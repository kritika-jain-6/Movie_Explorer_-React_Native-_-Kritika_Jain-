import React, {useEffect} from 'react';
import Navigation from './src/navigation/StackNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {WatchlistProvider} from './src/context/Watchlist';
import {PermissionsAndroid, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {StripeProvider} from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [fcmToken, setFcmToken] = React.useState<string | null>(null);
  useEffect(() => {
    requestPermissionAndroid();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  useEffect(()=>{
    AsyncStorage.setItem('fcmToken', fcmToken || '');  
  },[fcmToken])
  const requestPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
     
      getToken();
    } else {
      Alert.alert('Notification permission denied');
    }
  };
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
    setFcmToken(token);
  };

  return (
    <StripeProvider publishableKey="pk_test_51RMS1oRqxrOdhXngjAUSQpFx8IILqdmFW2V1ZA3MPn0L62mFhUBvyfkLEPzz7L8mLT4vgmSM17pHspyRK6fEod8r00mjGLBeD2">
      <WatchlistProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <Navigation />
        </GestureHandlerRootView>
      </WatchlistProvider>
    </StripeProvider>
  );
};

export default App;
