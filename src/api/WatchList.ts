import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Toast } from 'toastify-react-native';

const baseURL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';

export const getWatchList = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${baseURL}/api/v1/watchlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Toast.error('Error fetching watchlist');
    throw error;
  }
};

export const addWatchList = async (movieId: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.post(
      `${baseURL}/api/v1/watchlists`,
      { movie_id: movieId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log('Error adding movie to watchlist:', error.response?.data || error.message);
    throw error;
  }
};



export const deleteWatchList = async (id:string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.delete(`${baseURL}/api/v1/watchlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error deleting movie:', error.response?.data || error.message);
    throw error;
  }
};