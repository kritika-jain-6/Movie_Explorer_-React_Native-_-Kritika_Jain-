import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Home from '../src/screen/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateDeviceToken } from '../src/api/NotificationApi';
import { Toast } from 'toastify-react-native';

// Mock all imported components for simplicity
jest.mock('../src/component/Card', () => () => <></>);
jest.mock('../src/component/MovieCarousel', () => () => <></>);
jest.mock('../src/component/BornCard', () => () => <></>);
jest.mock('../src/component/Explore', () => () => <></>);
jest.mock('../src/component/Footer', () => () => <></>);

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

// Mock updateDeviceToken API
jest.mock('../src/api/NotificationApi', () => ({
  updateDeviceToken: jest.fn(),
}));

// Mock Toast
jest.mock('toastify-react-native', () => ({
  Toast: {
    error: jest.fn(),
  },
}));

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all main sections correctly', () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const { getByTestId, getByText } = render(<Home />);

    expect(getByTestId('HomeScreen')).toBeTruthy();

    expect(getByTestId('ExploreHeader').props.children).toBe("Explore What's Streaming");
    expect(getByTestId('WhatToDoHeader').props.children).toBe('What to do');
    expect(getByTestId('TopTenHeader').props.children).toBe('Top Ten');
    expect(getByTestId('BornTodayHeader').props.children).toBe('Born Today');
  });

  it('calls updateDeviceToken with fcmToken if authToken and fcmToken exist', async () => {
    AsyncStorage.getItem
      .mockImplementation((key) => {
        if (key === 'authToken') return Promise.resolve('auth-token-123');
        if (key === 'fcmToken') return Promise.resolve('fcm-token-456');
        return Promise.resolve(null);
      });

    updateDeviceToken.mockResolvedValue({ success: true });

    const { getByTestId } = render(<Home />);

     waitFor(() => {
      expect(updateDeviceToken).toHaveBeenCalledWith('fcm-token-456'); 
      expect(getByTestId('HomeScreen')).toBeTruthy();
    });
  });

  it('does not call updateDeviceToken if authToken or fcmToken missing', async () => {
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'authToken') return Promise.resolve(null);
      if (key === 'fcmToken') return Promise.resolve('some-fcm-token');
      return Promise.resolve(null);
    });

    render(<Home />);

    await waitFor(() => {
      expect(updateDeviceToken).not.toHaveBeenCalled();
    });
  });

  it('shows error toast if updateDeviceToken call throws error', async () => {
    AsyncStorage.getItem
      .mockImplementation((key) => {
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
