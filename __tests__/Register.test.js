import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Register from '../src/auth/Register';
import { NavigationContainer } from '@react-navigation/native';

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

jest.mock('../src/api/UserAPI', () => ({
  registeruser: jest.fn(),
}));

jest.mock('toastify-react-native', () => ({
  Toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

import { registeruser } from '../src/api/UserAPI';
import { Toast } from 'toastify-react-native';

describe('Register Component', () => {
  let getByTestId;
  let getByText;

  beforeEach(() => {
    jest.clearAllMocks();
    const renderResult = render(
      <NavigationContainer>
        <Register />
      </NavigationContainer>
    );
    getByTestId = renderResult.getByTestId;
    getByText = renderResult.getByText;
  });

  it('renders correctly', () => {
    expect(getByText('Create an Account')).toBeTruthy();
  });

  it('shows error for empty fields', async () => {
    fireEvent.press(getByTestId('register-button'));
     waitFor(() => {
      expect(Toast.error).toHaveBeenCalledWith('Validation Error Please enter all the fields');
    });
  });

  it('shows error for invalid email', async () => {
    fireEvent.changeText(getByTestId('name-input'), 'Test User');
    fireEvent.changeText(getByTestId('mobilenumber-input'), '1234567890');
    fireEvent.changeText(getByTestId('email-input'), 'invalidemail');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'password123');
    fireEvent.press(getByTestId('register-button'));
    await waitFor(() => {
      expect(Toast.error).toHaveBeenCalledWith('Validation Error Please enter a valid email address');
    });
  });

  it('shows error for short password', async () => {
    fireEvent.changeText(getByTestId('name-input'), 'Test User');
    fireEvent.changeText(getByTestId('mobilenumber-input'), '1234567890');
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), '123');
    fireEvent.changeText(getByTestId('confirm-password-input'), '123');
    fireEvent.press(getByTestId('register-button'));
    await waitFor(() => {
      expect(Toast.error).toHaveBeenCalledWith('Validation Error Password must be at least 6 characters long');
    });
  });

  it('shows error if passwords do not match', async () => {
    fireEvent.changeText(getByTestId('name-input'), 'Test User');
    fireEvent.changeText(getByTestId('mobilenumber-input'), '1234567890');
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'different123');
    fireEvent.press(getByTestId('register-button'));
    await waitFor(() => {
      expect(Toast.error).toHaveBeenCalledWith('Validation Error Passwords do not match');
    });
  });

  it('registers user successfully and navigates', async () => {
    registeruser.mockResolvedValueOnce({});
    fireEvent.changeText(getByTestId('name-input'), 'John Doe');
    fireEvent.changeText(getByTestId('mobilenumber-input'), '1234567890');
    fireEvent.changeText(getByTestId('email-input'), 'john.doe@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'password123');
    fireEvent.press(getByTestId('register-button'));
     waitFor(() => {
      expect(registeruser).toHaveBeenCalledWith('John Doe', '1234567890', 'john.doe@example.com', 'password123');
      expect(Toast.success).toHaveBeenCalledWith('Success Registration successful!');
      expect(mockNavigate).toHaveBeenCalledWith('MainTabs');
    });
  });

  it('handles registration API failure', async () => {
    registeruser.mockRejectedValueOnce(new Error('Failed'));
    fireEvent.changeText(getByTestId('name-input'), 'John Doe');
    fireEvent.changeText(getByTestId('mobilenumber-input'), '1234567890');
    fireEvent.changeText(getByTestId('email-input'), 'john.doe@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'password123');
    fireEvent.press(getByTestId('register-button'));
    await waitFor(() => {
      expect(Toast.error).toHaveBeenCalledWith('Registration Error');
    });
  });

  it('toggles password visibility', async () => {
    const passwordInput = getByTestId('password-input');
    const confirmPasswordInput = getByTestId('confirm-password-input');
    expect(passwordInput.props.secureTextEntry).toBe(true);
    expect(confirmPasswordInput.props.secureTextEntry).toBe(true);
  });
});
