import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieDetailScreen from '../src/screen/MovieDetailScreen';
import { useWatchlist } from '../src/context/Watchlist';

jest.mock('../src/context/Watchlist', () => ({
  useWatchlist: jest.fn(),
}));

const mockNavigation = {
  goBack: jest.fn(),
};

const mockMovie = {
  id: '1',
  title: 'Inception',
  genre: 'Sci-Fi',
  rating: '8.8',
  release_year: '2010',
  duration: '148',
  poster_url: 'https://example.com/inception.jpg',
  description: 'A mind-bending thriller by Christopher Nolan.',
};

describe('MovieDetailScreen', () => {
  const addToWatchlist = jest.fn();
  const removeFromWatchlist = jest.fn();
  const isInWatchlist = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useWatchlist.mockReturnValue({
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
    });
  });

  it('should render movie details correctly', () => {
    const { getByText, getByTestId } = render(
      <MovieDetailScreen
        route={{ params: { movie: mockMovie } }}
        navigation={mockNavigation}
      />,
    );

    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('Sci-Fi')).toBeTruthy();
    expect(getByText('⭐ 8.8/10')).toBeTruthy();
    expect(getByText('Year: 2010')).toBeTruthy();
    expect(getByText('Duration: 148 min')).toBeTruthy();
    expect(getByText('A mind-bending thriller by Christopher Nolan.')).toBeTruthy();
    expect(getByTestId('watchlist-button')).toBeTruthy();
  });



  it('should add the movie to watchlist when the button is pressed', () => {
    isInWatchlist.mockReturnValue(false);

    const { getByText, getByTestId } = render(
      <MovieDetailScreen
        route={{ params: { movie: mockMovie } }}
        navigation={mockNavigation}
      />,
    );

    const watchlistButton = getByTestId('watchlist-button');
    fireEvent.press(watchlistButton);

    expect(addToWatchlist).toHaveBeenCalledWith(mockMovie);
    expect(getByText('Remove from Watchlist')).toBeTruthy();
  });

  it('should remove the movie from watchlist when the button is pressed', () => {
    isInWatchlist.mockReturnValue(true);

    const { getByText, getByTestId } = render(
      <MovieDetailScreen
        route={{ params: { movie: mockMovie } }}
        navigation={mockNavigation}
      />,
    );

    const watchlistButton = getByTestId('watchlist-button');
    fireEvent.press(watchlistButton);

    expect(removeFromWatchlist).toHaveBeenCalledWith(mockMovie.id);

  });
});
