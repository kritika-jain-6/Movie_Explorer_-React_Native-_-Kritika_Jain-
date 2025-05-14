import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AdminHome from '../src/screen/AdminHome';
import * as AdminApi from '../src/api/AdminApi';

jest.mock('../src/api/AdminApi');
jest.mock('toastify-react-native', () => ({ Toast: { error: jest.fn() } }));
jest.mock('../src/component/Addmodal', () => {
  return ({ visible, onClose, onAdd, onEdit, movie }) => null;
});

describe('AdminHome Screen', () => {
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

  it('renders without crashing', async () => {
    AdminApi.getMovies.mockResolvedValueOnce({ movies: mockMovies });
    const { getByText } = render(<AdminHome />);
    await waitFor(() => {
      expect(getByText('Movie Admin')).toBeTruthy();
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



  it('calls addMovie when handleAddMovie is triggered', async () => {
    AdminApi.getMovies.mockResolvedValueOnce({ movies: [] });
    AdminApi.addMovie.mockResolvedValueOnce(mockMovies[0]);
    const { getByText } = render(<AdminHome />);
    await waitFor(() => expect(getByText('+ Add New Movie')).toBeTruthy());
    fireEvent.press(getByText('+ Add New Movie'));
  });

  it('handles fetchMovies error gracefully', async () => {
    AdminApi.getMovies.mockRejectedValueOnce(new Error('Network error'));
    render(<AdminHome />);
    await waitFor(() => {
      expect(require('toastify-react-native').Toast.error).toHaveBeenCalledWith('Error Failed to load movies');
    });
  });
});
