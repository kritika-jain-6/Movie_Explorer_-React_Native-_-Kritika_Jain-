import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { updateDeviceToken } from './NotificationApi';


const baseURL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';

export const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(token);
    const response = await axios.get(`${baseURL}/api/v1/current_user`,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

    if (fcmToken) {
      const updateToken = await updateDeviceToken(fcmToken);
      console.log(updateToken);
      
    }
    return response.data;

  } catch (error) {
    // console.log('Error fetching user:', error.response);
    throw error;
  }
};

export const logoutUser = async () => {
  const token = await AsyncStorage.getItem('authToken');
  try {
    const response = await axios.delete(`${baseURL}/users/sign_out`,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
    return response.data;
  } catch (error) {
    // console.log('Error logging out user:', error.response);
    throw error;
  }
};
