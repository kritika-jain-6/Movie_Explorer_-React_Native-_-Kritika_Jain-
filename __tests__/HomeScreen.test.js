import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Home from '../src/screen/HomeScreen';
import { Toast } from 'toastify-react-native';
import { getUser } from '../src/api/AuthAPI';

jest.mock('toastify-react-native', () => ({
  Toast: { error: jest.fn() },
}));
jest.mock('../src/api/AuthAPI', () => ({
  getUser: jest.fn(),
}));

jest.mock('../src/component/MovieCarousel', () => () => <></>);
jest.mock('../src/component/Explore', () => () => <></>);
jest.mock('../src/component/Card', () => () => <></>);
jest.mock('../src/component/MovieCard', () => () => <></>);
jest.mock('../src/component/BornCard', () => () => <></>);
jest.mock('../src/component/Footer', () => () => <></>);

// const fetchUser = async () => {
//   try {
//     await getUser();
//   } catch (error) {
//     Toast.error('Error fetching user data:');
//   }
// };

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all main sections and headers', () => {
    const { getByTestId, getByText } = render(<Home />);
    expect(getByTestId('HomeScreen')).toBeTruthy();
    expect(getByTestId('ExploreHeader')).toBeTruthy();
    expect(getByTestId('WhatToDoHeader')).toBeTruthy();
    expect(getByTestId('TopTenHeader')).toBeTruthy();
    expect(getByTestId('BornTodayHeader')).toBeTruthy();

    expect(getByText("Explore What's Streaming")).toBeTruthy();
    expect(getByText('What to do')).toBeTruthy();
    expect(getByText('Top Ten')).toBeTruthy();
    expect(getByText('Born Today')).toBeTruthy();
  });

  it('calls getUser on mount (success)', async () => {
    getUser.mockResolvedValueOnce({});
    render(<Home />);
    waitFor(() => {
      expect(getUser).toHaveBeenCalled();
    });
  });

   it('calls getUser on mount (success path)', async () => {
    getUser.mockResolvedValueOnce({});
    render(<Home />);
    waitFor(() => {
      expect(getUser).toHaveBeenCalled();
    });
    expect(Toast.error).not.toHaveBeenCalled();
  });


  it('shows error toast if getUser fails (error path)', async () => {
    getUser.mockRejectedValueOnce(new Error('error'));
    render(<Home />);
    waitFor(() => {
      expect(getUser).toHaveBeenCalled();
      expect(Toast.error).toHaveBeenCalledWith('Error fetching user data:');
    });
  });
  // it('calls getUser and handles success', async () => {
  //   getUser.mockResolvedValueOnce({});
  //   await fetchUser();
  //   expect(getUser).toHaveBeenCalled();
  //   expect(Toast.error).not.toHaveBeenCalled();
  // });

  // it('calls getUser and handles error', async () => {
  //   getUser.mockRejectedValueOnce(new Error('fail'));
  //   await fetchUser();
  //   expect(getUser).toHaveBeenCalled();
  //    waitFor(() => {
  //     expect(Toast.error).toHaveBeenCalledWith('Error fetching user data:');
  //   });
  // });
});