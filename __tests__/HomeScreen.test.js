import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Home from '../src/screen/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateDeviceToken } from '../src/api/NotificationApi';
import { Toast } from 'toastify-react-native';

// Mocks
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));
jest.mock('../src/api/NotificationApi', () => ({
  updateDeviceToken: jest.fn(),
}));
jest.mock('toastify-react-native', () => ({
  Toast: { error: jest.fn() },
}));

describe('HomeScreen useEffect Device Token Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls updateDeviceToken if both authToken and fcmToken exist', async () => {
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'authToken') return Promise.resolve('my-auth-token');
      if (key === 'fcmToken') return Promise.resolve('my-fcm-token');
      return Promise.resolve(null);
    });
    updateDeviceToken.mockResolvedValue({ success: true });

    render(<Home />);
     waitFor(() => {
      expect(updateDeviceToken).toHaveBeenCalledWith('my-fcm-token');
    });
  });

  it('does not call updateDeviceToken if authToken is missing', async () => {
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'authToken') return Promise.resolve(null);
      if (key === 'fcmToken') return Promise.resolve('my-fcm-token');
      return Promise.resolve(null);
    });

    render(<Home />);
    await waitFor(() => {
      expect(updateDeviceToken).not.toHaveBeenCalled();
    });
  });

  it('does not call updateDeviceToken if fcmToken is missing', async () => {
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'authToken') return Promise.resolve('my-auth-token');
      if (key === 'fcmToken') return Promise.resolve(null);
      return Promise.resolve(null);
    });

    render(<Home />);
    await waitFor(() => {
      expect(updateDeviceToken).not.toHaveBeenCalled();
    });
  });

  it('shows toast error if updateDeviceToken throws', async () => {
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'authToken') return Promise.resolve('token');
      if (key === 'fcmToken') return Promise.resolve('fcm');
      return Promise.resolve(null);
    });

    updateDeviceToken.mockRejectedValue(new Error('API error'));

    render(<Home />);
     waitFor(() => {
      expect(Toast.error).toHaveBeenCalledWith('Error fetching user data:');
    });
  });
});