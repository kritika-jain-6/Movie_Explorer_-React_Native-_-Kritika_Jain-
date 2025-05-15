import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SplashScreen from '../src/screen/SplashScreen';
import { Toast } from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../src/api/AuthAPI';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('../src/api/AuthAPI', () => ({
  getUser: jest.fn(),
}));

jest.mock('toastify-react-native', () => ({
  Toast: {
    error: jest.fn(),
  },
}));

describe('SplashScreen', () => {
  const mockNavigate = jest.fn();

  const setup = () => {
    return render(<SplashScreen navigation={{ navigate: mockNavigate }} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders background image and start button', () => {
    const { getByTestId, getByText } = setup();

    expect(getByTestId('splash-background')).toBeTruthy();
    expect(getByTestId('bottom-container')).toBeTruthy();
    expect(getByTestId('start-button')).toBeTruthy();
    expect(getByText("Let's Get Started")).toBeTruthy();
  });

  it('navigates to MainTabs when token exists and user is fetched', async () => {
    AsyncStorage.getItem.mockResolvedValue('valid-token');
    getUser.mockResolvedValue({ id: '123', name: 'John' });

    const { getByTestId } = setup();
    fireEvent.press(getByTestId('start-button'));

    await waitFor(() => {
      expect(getUser).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('MainTabs');
    });
  });

  it('navigates to Login when no token exists', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const { getByTestId } = setup();
    fireEvent.press(getByTestId('start-button'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Login');
    });
  });

  it('shows error toast when getUser throws', async () => {
    AsyncStorage.getItem.mockResolvedValue('token');
    getUser.mockRejectedValue(new Error('Failed to fetch'));

    const { getByTestId } = setup();
    fireEvent.press(getByTestId('start-button'));

    waitFor(() => {
      expect(Toast.error).toHaveBeenCalledWith('Error fetching user data:');
    });
  });
});
