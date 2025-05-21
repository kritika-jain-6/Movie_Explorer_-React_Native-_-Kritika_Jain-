import axios from 'axios';
import React from 'react';

const movieURL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';
export const getMovieDetails = async()=>{
    try{
        const response = await axios.get(`${movieURL}/api/v1/movies?page=1&per_page=20`);
        console.log('Movie details', response.data);
        return response.data;
    }catch (error){
        // console.log('Error in getting movie details',error.response?.data || error.message);
        throw error;
    }
};

export const getMovieDetail = async()=>{
    try{
        const response = await axios.get(`${movieURL}/api/v1/movies`);
        console.log('Movie details', response.data);
        return response.data;
    }catch (error){
        // console.log('Error in getting movie details',error.response?.data || error.message);
        throw error;
    }
};



interface Movie {
  _id: string;
  title: string;
  genre: string;
  director: string;
  releaseYear: number;
  [key: string]: any; // For any additional properties
}

interface MovieAPIResponse {
  data: Movie[];
  [key: string]: any; // For any additional properties
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response: MovieAPIResponse = await axios.get(`${movieURL}/api/v1/movies?title=${query}`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    // console.log('Error searching movies:', error.response);
    throw error;
  }
};

export const filterMovies = async  (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${movieURL}/api/v1/movies?genre=${query}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log('Error filtering movies:', error.response);
    throw error;
  }
};

