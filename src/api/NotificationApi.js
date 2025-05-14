import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';

const BASE_URL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';

export const updateDeviceToken = async (fcmToken) => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.post(`${BASE_URL}/v1/update_device_token`, {
            device_token : fcmToken,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}