import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import Card from '../src/component/Card';
import * as MovieAPI from '../src/api/MovieAPI';


jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('Card Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the loading state', () => {
    jest.spyOn(MovieAPI, 'getMovieDetails').mockImplementation(() => new Promise(() => {}));
    render(<Card />);
    expect(screen.getByTestId('loading')).toBeTruthy();
    expect(screen.getByText('Loading movies...')).toBeTruthy();
  });

  it('renders the error state when fetching movies fails', async () => {
    jest.spyOn(MovieAPI, 'getMovieDetails').mockRejectedValue(new Error('Network error'));
    render(<Card />);
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeTruthy();
      expect(screen.getByText('Failed to fetch movies. Please try again.')).toBeTruthy();
    });
  });

  it('renders the movie list when data fetch is successful', async () => {
    const mockMovies = [
      {
        id: '1',
        title: 'Inception',
        genre: 'Sci-Fi',
        rating: '8.8',
        release_year: '2010',
        duration: '2h 28m',
        poster_url: 'https://example.com/inception.jpg',
      },
    ];

    jest.spyOn(MovieAPI, 'getMovieDetails').mockResolvedValue({ movies: mockMovies });
    render(<Card />);
    waitFor(() => {
      expect(screen.getByTestId('movie-list')).toBeTruthy();
      expect(screen.getByTestId('movie-card-1')).toBeTruthy();
      expect(screen.getByText('Inception')).toBeTruthy();
    });
  });
});
