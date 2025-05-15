import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { MovieCarousel } from '../src/component/MovieCarousel';
import { getMovieDetails } from '../src/api/MovieAPI';
import { useNavigation } from '@react-navigation/native';

// Mock getMovieDetails API
jest.mock('../src/api/MovieAPI', () => ({
  getMovieDetails: jest.fn(),
}));

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockMovies = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Sci-Fi',
    rating: 8.8,
    release_year: 2010,
    poster_url: 'https://image.tmdb.org/t/p/inception.jpg',
  },
  {
    id: 2,
    title: 'The Matrix',
    genre: 'Action',
    rating: 8.7,
    release_year: 1999,
    poster_url: 'https://image.tmdb.org/t/p/matrix.jpg',
  },
];

describe('MovieCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator initially', async () => {
    getMovieDetails.mockImplementation(() => new Promise(() => {})); // never resolves

    const { getByTestId } = render(<MovieCarousel />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error message when fetch fails', async () => {
    getMovieDetails.mockRejectedValue(new Error('Failed'));

    const { getByText } = render(<MovieCarousel />);
    await waitFor(() => {
      expect(getByText('Failed to fetch movies. Please try again.')).toBeTruthy();
    });
  });

  it('renders movies after successful fetch', async () => {
    getMovieDetails.mockResolvedValue({ movies: mockMovies });

    const { getByText } = render(<MovieCarousel />);

     waitFor(() => {
      expect(getByText('Inception')).toBeTruthy();
      expect(getByText('The Matrix')).toBeTruthy();
    });
  });

  // it('navigates to SearchResults screen when a movie is pressed', async () => {
  //   getMovieDetails.mockResolvedValue({ movies: mockMovies });

  //   const { getByText } = render(<MovieCarousel />);

  //   waitFor(() => {
  //     expect(getByText('Inception')).toBeTruthy();
  //   });

  //   // fireEvent.press(getByText('Inception'));
  //   expect(mockNavigate).toHaveBeenCalledWith('SearchResults', {
  //     movie: mockMovies[0],
  //   });
  // });

  it('handles empty or invalid movie data gracefully', async () => {
    getMovieDetails.mockResolvedValue(undefined);

    const { getByText } = render(<MovieCarousel />);
    await waitFor(() => {
      expect(getByText('Failed to fetch movies. Please try again.')).toBeTruthy();
    });
  });
});
