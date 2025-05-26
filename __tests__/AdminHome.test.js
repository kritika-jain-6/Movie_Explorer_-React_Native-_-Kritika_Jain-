import React from 'react';
import { render, fireEvent, waitFor, renderHook } from '@testing-library/react-native';
import AdminHome from '../src/screen/AdminHome';
import * as AdminApi from '../src/api/AdminApi';

jest.mock('../src/api/AdminApi');
jest.mock('toastify-react-native', () => ({
  Toast: { error: jest.fn() },
}));


describe('AdminHome', () => {
  const mockMovies = [
    {
      id: '1',
      title: 'Test Movie',
      year: '2023',
      poster: 'https://example.com/poster.jpg',
    },
    {
      id: '2',
      title: 'Another Movie',
      year: '2024',
      poster: 'https://example.com/poster2.jpg',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header and add button', async () => {
    AdminApi.getMovies.mockResolvedValueOnce({ movies: mockMovies });
    const { getByText } = render(<AdminHome />);
    await waitFor(() => {
      expect(getByText('Movie Admin')).toBeTruthy();
      expect(getByText('+ Add New Movie')).toBeTruthy();
    });
  });

  it('displays movies fetched from API', async () => {
    AdminApi.getMovies.mockResolvedValueOnce({ movies: mockMovies });
    const { getByText } = render(<AdminHome />);
    await waitFor(() => {
      expect(getByText('Test Movie')).toBeTruthy();
      expect(getByText('Another Movie')).toBeTruthy();
    });
  });

  it('shows error if fetching movies fails', async () => {
    AdminApi.getMovies.mockRejectedValueOnce(new Error('fail'));
    render(<AdminHome />);
    await waitFor(() => {
      expect(require('toastify-react-native').Toast.error).toHaveBeenCalledWith('Error Failed to load movies');
    });
  });

  it('opens modal when add button is pressed', async () => {
    AdminApi.getMovies.mockResolvedValueOnce({ movies: [] });
    const { getByText } = render(<AdminHome />);
    await waitFor(() => expect(getByText('+ Add New Movie')).toBeTruthy());
    fireEvent.press(getByText('+ Add New Movie'));
  
  });

   
});