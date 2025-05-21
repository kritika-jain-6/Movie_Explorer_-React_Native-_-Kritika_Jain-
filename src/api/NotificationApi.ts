import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';

const BASE_URL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';

interface UpdateDeviceTokenRequest {
    device_token: string;
}

interface UpdateDeviceTokenResponse {
    success: boolean;
    message?: string;
    [key: string]: any;
}

export const updateDeviceToken = async (
    fcmToken: string
): Promise<UpdateDeviceTokenResponse> => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        const requestBody: UpdateDeviceTokenRequest = {
            device_token: fcmToken,
        };
        const response = await axios.post<UpdateDeviceTokenResponse>(
            `${BASE_URL}/api/v1/update_device_token`,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}