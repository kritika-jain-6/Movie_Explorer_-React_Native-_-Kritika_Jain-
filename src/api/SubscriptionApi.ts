import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'toastify-react-native';

const BASE_URL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';

interface CreateSubscriptionResponse {
  [key: string]: any;
}

export const createSubscription = async (
  planType: string
  // expiresAt: string
): Promise<CreateSubscriptionResponse> => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    const response = await axios.post<CreateSubscriptionResponse>(
      `${BASE_URL}/api/v1/subscriptions`,
      {
        plan_type: planType,
        client_type: 'mobile',
        // expires_at: new Date(expires_at),
      },      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
    // console.log('Subscription created:', response.data);
  } catch (error) {
    Toast.error('Error fetching subscription:');
    throw error;
  }
};

interface HandleSuccessfulPaymentResponse {
  [key: string]: any;
}

export const handleSuccessfulPayment = async (
  sessionId: string
): Promise<import('axios').AxiosResponse<HandleSuccessfulPaymentResponse>> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get<HandleSuccessfulPaymentResponse>(
      `${BASE_URL}/v1/subscriptions/success?session_id=${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchUserSubscription = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(
      `${BASE_URL}/api/v1/subscriptions/status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
