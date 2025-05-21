import React from 'react';
import axios from 'axios';


const baseURL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';

interface LoginUserParams {
  email: string;
  password: string;
}

interface LoginUserResponse {
 
  [key: string]: any;
}

export const loginuser = async (
  email: string,
  password: string
): Promise<LoginUserResponse> => {
  try {
    const response = await axios.post<LoginUserResponse>(`${baseURL}/users/sign_in`, {
      user: {
        email,
        password,
      },
    });

    
    return response.data;
  } catch (error) {
    // console.log('error', error.response?.data || error.message);
    throw error;
  }
};

  interface RegisterUserParams {
    name: string;
    mobilenumber: string;
    email: string;
    password: string;
  }

  interface RegisterUserResponse {
    [key: string]: any;
  }

  export const registeruser = async (
    name: string,
    mobilenumber: string,
    email: string,
    password: string
  ): Promise<RegisterUserResponse> => {
    try {
      const response = await axios.post<RegisterUserResponse>(`${baseURL}/users`, {
        user: {
          name,
          mobile_number: mobilenumber,
          email,
          password,
        },
      });

      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      // console.log('Error REGISTRATION response:', error.response);
      throw error;
    }
  };


