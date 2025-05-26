import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {Toast} from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import withNavigation from '../navigation/withHOC';
import {loginuser} from '../api/UserAPI';

const {width, height} = Dimensions.get('window');

interface State {
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  errorMessage: string;
}
import {NavigationProp} from '@react-navigation/native';
import {AuthParamList} from '../types/types';

type Props = {
  navigation: NavigationProp<AuthParamList>;
};

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      errorMessage: '',
    };
  }

  handleLogin = async () => {
    const {email, password} = this.state;

    if (!email || !password) {
      const msg = 'Please enter all the fields';
      this.setState({errorMessage: msg});
      Toast.error('Validation Error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const msg = 'Please enter a valid email address';
      this.setState({errorMessage: msg});
      Toast.error('Validation Error');
      return;
    }

    if (password.length < 6) {
      const msg = 'Password must be at least 6 characters long';
      this.setState({errorMessage: msg});
      Toast.error('Validation Error');
      return;
    }

    this.setState({loading: true, errorMessage: ''});

    try {
      const response = await loginuser(email, password);
      console.log(response);

      const token = response.token;
      const role = await response.role;

      const user = {
        email: '',
        role: '',
      };

      if (response) {
        (user.email = response.email), (user.role = response.role);
      }

      if (token) {
        await AsyncStorage.setItem('authToken', token);
        console.log('Token:', token);

        await AsyncStorage.setItem('CurrentUser', JSON.stringify(user));
        Toast.success('Success Logged in!');
        if (role === 'supervisor') {
          this.props.navigation.navigate('AdminTab');
        } else {
          this.props.navigation.navigate('MainTabs');
        }
      } else {
        const msg = 'Token not received. Please try again';
        this.setState({errorMessage: msg});
        Toast.error('Login Error');
      }
    } catch (error: any) {
      const msg =error.response?.data?.message || error.message || 'Login failed';
      this.setState({errorMessage: msg});
      Toast.error('Login Error');
      console.log(error.response);
    } finally {
      this.setState({loading: false});
    }
  };

  render() {
    const {navigation} = this.props;
    const {email, password, showPassword, loading, errorMessage} = this.state;

    return (
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.background}>
        <KeyboardAvoidingView >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Text style={styles.title}>Welcome to {'\n'} BINGE</Text>

              {errorMessage ? (
                <Text style={styles.errorText} testID="error-message">
                  {errorMessage}
                </Text>
              ) : null}

              <TextInput
                testID="email-input"
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="white"
                value={email}
                onChangeText={text => this.setState({email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                accessibilityLabel="Email Input"
              />

              <View>
                <TextInput
                  testID="password-input"
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="white"
                  value={password}
                  onChangeText={text => this.setState({password: text})}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={this.handleLogin}
                  accessibilityLabel="Password Input"
                />
                <TouchableOpacity
                  onPress={() => this.setState({showPassword: !showPassword})}
                  style={styles.showPasswordButton}>
             
                  <Image
                    source={
                      showPassword
                        ? require('../assets/view.png')
                        : require('../assets/hide.png')
                    }
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                testID="login-button"
                style={styles.button}
                onPress={this.handleLogin}
                disabled={loading}
                accessibilityLabel="Login Button">
                {loading ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.registerText}>New Here? Register Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

export default withNavigation(Login);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    height: height,
    width: width,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: width * 0.8,
    height: height * 0.55,
    marginTop: height * 0.2,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#fff',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  showPasswordText: {
    color: '#FFD700',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FFD700',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#FFD700',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 10,
  },
});
