import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useRoute, useNavigation, NavigationProp} from '@react-navigation/native';
import { HomeStackParamList } from '../types/types';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const { url } = route.params as PaymentScreenRouteParams;

  interface PaymentScreenRouteParams {
    url: string;
    session_id: string;
  }

  interface NavigationState {
    url: string;
    [key: string]: any;
  }

  const handleNavigationStateChange = (navState: NavigationState): void => {
    console.log(navState.url);
    if (navState.url.includes('success')) {
      navigation.navigate('Success');
    } else if (navState.url.includes('cancel')) {
      navigation.navigate('Cancel');
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: url}}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#fff" />}
        style={styles.webview}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
});