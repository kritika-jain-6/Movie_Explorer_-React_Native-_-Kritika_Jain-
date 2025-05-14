import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';

const BASE_URL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';

export const createSubscription = async (planType) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.post(
      `${BASE_URL}/api/v1/subscriptions`,
      {plan_type: planType,
        client_Type: 'mobile'},
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    Toast.error('Error fetching subscription:');
    throw error;
  }
};

export const handleSuccessfulPayment = async (sessionId) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${BASE_URL}/v1/subscriptions/success?session_id=${sessionId}`,{},{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const fetchUserSubscription = async() => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${BASE_URL}/api/v1/subscriptions/status`,{
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
