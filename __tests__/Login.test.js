import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../src/auth/Login';
import { NavigationContainer } from '@react-navigation/native';
import { loginuser } from '../src/api/UserAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';

jest.mock('../src/api/UserAPI');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

jest.mock('toastify-react-native', () => ({
  Toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Login Component', () => {
  let getByTestId: any;
  let getByText: any;

  beforeEach(() => {
    const component = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
    getByTestId = component.getByTestId;
    getByText = component.getByText;

    jest.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('shows error if fields are empty', () => {
    fireEvent.press(getByTestId('login-button'));

    expect(Toast.error).toHaveBeenCalledWith('Validation Error');
    expect(getByTestId('error-message').props.children).toBe('Please enter all the fields');
  });

  it('shows error for invalid email', () => {
    fireEvent.changeText(getByTestId('email-input'), 'invalidemail');
    fireEvent.changeText(getByTestId('password-input'), 'validpass');

    fireEvent.press(getByTestId('login-button'));

    expect(Toast.error).toHaveBeenCalledWith('Validation Error');
    expect(getByTestId('error-message').props.children).toBe('Please enter a valid email address');
  });

  it('shows error for short password', () => {
    fireEvent.changeText(getByTestId('email-input'), 'user@example.com');
    fireEvent.changeText(getByTestId('password-input'), '123');

    fireEvent.press(getByTestId('login-button'));

    expect(Toast.error).toHaveBeenCalledWith('Validation Error');
    expect(getByTestId('error-message').props.children).toBe('Password must be at least 6 characters long');
  });

  it('logs in and navigates to MainTabs', async () => {
    loginuser.mockResolvedValue({
      token: 'token123',
      email: 'user@example.com',
      role: 'user',
    });

    fireEvent.changeText(getByTestId('email-input'), 'user@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');

    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('authToken', 'token123');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'CurrentUser',
        JSON.stringify({ email: 'user@example.com', role: 'user' })
      );
      expect(Toast.success).toHaveBeenCalledWith('Success Logged in!');
      expect(mockNavigate).toHaveBeenCalledWith('MainTabs');
    });
  });

  it('logs in and navigates to AdminTab for supervisor role', async () => {
    loginuser.mockResolvedValue({
      token: 'token456',
      email: 'super@example.com',
      role: 'supervisor',
    });

    fireEvent.changeText(getByTestId('email-input'), 'super@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');

    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('AdminTab');
    });
  });

  it('shows login error if API fails', async () => {
    loginuser.mockRejectedValue({ message: 'Invalid credentials' });

    fireEvent.changeText(getByTestId('email-input'), 'fail@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');

    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(Toast.error).toHaveBeenCalledWith('Login Error');
      expect(getByTestId('error-message').props.children).toBe('Invalid credentials');
    });
  });

  it('toggles password visibility', () => {
    const passwordInput = getByTestId('password-input');
    expect(passwordInput.props.secureTextEntry).toBe(true);

    const toggleButton = getByText('Show');
    fireEvent.press(toggleButton);

    expect(getByTestId('password-input').props.secureTextEntry).toBe(false);

    fireEvent.press(getByText('Hide'));
    expect(getByTestId('password-input').props.secureTextEntry).toBe(true);
  });

  it('navigates to Register screen on register text press', () => {
    fireEvent.press(getByText('New Here? Register Now'));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});
