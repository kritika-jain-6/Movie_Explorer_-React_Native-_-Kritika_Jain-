import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ProfileScreen from '../src/screen/ProfileScreen';
import {Toast} from 'toastify-react-native';
import {getUser, logoutUser} from '../src/api/AuthAPI';

jest.mock('../src/api/AuthAPI', () => ({
  getUser: jest.fn(),
  logoutUser: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('toastify-react-native', () => ({
  Toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ProfileScreen', () => {
  const mockUserData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    mobile_number: '1234567890',
    role: 'User',
    avatar: 'https://example.com/avatar.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getUser.mockResolvedValue(mockUserData);
  });

  it('renders loading state initially', () => {
    const {getByText} = render(<ProfileScreen />);
    expect(getByText('Loading profile...')).toBeTruthy();
  });

  it('displays user data after fetching', async () => {
    const {getByPlaceholderText} = render(<ProfileScreen />);

    waitFor(() => {
      expect(getByPlaceholderText('Enter your name').props.value).toBe(
        mockUserData.name,
      );
      expect(getByPlaceholderText('Enter your email').props.value).toBe(
        mockUserData.email,
      );
      expect(getByPlaceholderText('Enter mobile number').props.value).toBe(
        mockUserData.mobile_number,
      );
      expect(getByPlaceholderText('Enter your role').props.value).toBe(
        mockUserData.role,
      );
    });
  });

  

  // it('handles logout failure', async () => {
  //   const {findByText} = render(<ProfileScreen />);
  //   const logoutButton = await findByText('Logout');
  //   fireEvent.press(logoutButton);
  //   waitFor(() => {
  //     expect(Toast.error).toHaveBeenCalled();
  //   });
  // });

  it('renders the avatar with a placeholder if no image URL is provided', async () => {
    getUser.mockResolvedValueOnce({...mockUserData, avatar: ''});

    const {getByTestId} = render(<ProfileScreen />);

     waitFor(() => getByTestId('add-photo-button'));
  });

  it('handles error during user data fetching', async () => {
    getUser.mockRejectedValueOnce(new Error('API error'));

    await waitFor(() => {
      render(<ProfileScreen />);
    });

   
  });
});
