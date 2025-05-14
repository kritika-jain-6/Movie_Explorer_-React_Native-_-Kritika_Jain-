import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useRoute, useNavigation} from '@react-navigation/native';

const PaymentScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const {url, session_id} = route.params;

  const handleNavigationStateChange = navState => {
    console.log(navState.url)
    if (navState.url.includes('success')) {
      console.log('hi')
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