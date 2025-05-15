import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useRoute, useNavigation} from '@react-navigation/native';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { url, session_id } = route.params as PaymentScreenRouteParams;

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
      navigation.navigate('Home');
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