import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Toast } from 'toastify-react-native';

const baseURL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';


export const getMovies = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/v1/movies?page=1&per_page=20`);
      return response.data;
    } catch (error) {
      Toast.error('Error fetching user:');
      throw error;
    }
  };

export const addMovie = async (movie:string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.post(
      `${baseURL}/api/v1/movies`,
      movie,
      {   
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.log('Error adding movie:', error.response?.data || error.message);
    throw error;
  }
};

export interface MovieUpdatePayload {
  id: number;
  [key: string]: any;
}

export const updateMovie = async (id, movie: MovieUpdatePayload) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.patch(
      `${baseURL}/api/v1/movies/${id}`,
      movie,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log('Error updating movie:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteMovie = async (id:string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.delete(`${baseURL}/api/v1/movies/${id}`, {
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
