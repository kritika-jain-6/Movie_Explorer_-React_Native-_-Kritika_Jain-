import React from 'react';
import axios from 'axios';


const baseURL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';

export const loginuser = async (email, password) => {
    try {
      const response = await axios.post(`${baseURL}/users/sign_in`, {
        user: {
          email,
          password,
        },
      });
      return response.data;
    } catch (error) {
      console.log('error', error.response?.data || error.message);
      throw error;
    }
  };

  export const registeruser = async (name, mobilenumber, email, password) => {
    try {
      const response = await axios.post(`${baseURL}/users`, {
        user: {
          name,
          mobile_number:mobilenumber,
          email,
          password,
        },
      });

      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error REGISTRATION response:', error.response);
      throw error;
    }
  };


