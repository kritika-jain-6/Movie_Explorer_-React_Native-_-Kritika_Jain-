import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Toast} from 'toastify-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getUser, logoutUser} from '../api/AuthAPI';
import {fetchUserSubscription} from '../api/SubscriptionApi';
import {RootStackParamList} from '../types/types';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    mobile_number: '',
    avatar: '',
  });
  const [subscriptionPlan, setSubscriptionPlan] = useState<string>('');

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUser();
        setProfile({
          name: userData.name || '',
          email: userData.email || '',
          mobile_number: userData.mobile_number || '',
          avatar: userData.avatar || '',
        });

        const subData = await fetchUserSubscription();
        // console.log('subData', subData);

        setSubscriptionPlan(subData.plan_type || 'No subscription');
      } catch (error) {
        Toast.error('Error fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      Toast.success('Success! You have been logged out.');
      navigation.navigate('Login');
    } catch (error) {
      Toast.error('Failed to logout. Please try again later.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{color: '#fff'}}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarContainer}
          testID="add-photo-button">
          <Image source={require('../assets/user.png')} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={profile.mobile_number}
          placeholder="Enter mobile number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Subscription Plan</Text>
        <TextInput
          style={styles.input}
          value={subscriptionPlan}
          placeholder="Subscription info"
          placeholderTextColor="#999"
          editable={false}
        />
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#fff',
    // borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#333',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
