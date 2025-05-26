import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import MovieCard, { MovieItem } from '../src/component/MovieCard';
import { getMovieDetail } from '../src/api/MovieAPI';

jest.mock('../src/api/MovieAPI', () => ({
  getMovieDetail: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const mockMovies = [
  {
    id: '1',
    title: 'Movie One',
    description: 'desc',
    genre: 'Action',
    rating: '8.5',
    release_year: '2022',
    duration: '120 min',
    poster_url: 'https://example.com/1.jpg',
    premium: true,
  },
  {
    id: '2',
    title: 'Movie Two',
    description: 'desc',
    genre: 'Drama',
    rating: '7.0',
    release_year: '2021',
    duration: '110 min',
    poster_url: 'https://example.com/2.jpg',
    premium: false,
  },
];

describe('MovieCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading indicator initially', () => {
    const { getByTestId, getByText } = render(<MovieCard />);
    expect(getByTestId('loading')).toBeTruthy();
    expect(getByText('Loading movies...')).toBeTruthy();
  });

  it('shows error message if fetch fails', async () => {
    getMovieDetail.mockRejectedValueOnce(new Error('fail'));
    const { getByTestId, findByText } = render(<MovieCard />);
    await waitFor(() => {
      expect(getByTestId('error')).toBeTruthy();
    });
    expect(await findByText('Failed to fetch movies. Please try again.')).toBeTruthy();
  });

  it('renders movies after fetch', async () => {
    getMovieDetail.mockResolvedValueOnce({ movies: mockMovies });
    const { getByTestId, getByText, queryByText } = render(<MovieCard />);
    await waitFor(() => {
      expect(getByTestId('card-component')).toBeTruthy();
      expect(getByTestId('movie-list')).toBeTruthy();
    });
    expect(getByText('Movie One')).toBeTruthy();
    expect(getByText('Movie Two')).toBeTruthy();
    expect(getByText('⭐ 8.5')).toBeTruthy();
    expect(getByText('⭐ 7.0')).toBeTruthy();
    expect(getByText('2022 | 120 min')).toBeTruthy();
    expect(getByText('2021 | 110 min')).toBeTruthy();
    // Premium badge
    expect(getByText('Premium')).toBeTruthy();
    
  });

  it('navigates to MovieDetailScreen on movie press', async () => {
    const navigate = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate });
    getMovieDetail.mockResolvedValueOnce({ movies: mockMovies });
    const { getByText } = render(<MovieCard />);
    await waitFor(() => {
      expect(getByText('Movie One')).toBeTruthy();
    });
    fireEvent.press(getByText('Movie One'));
    expect(navigate).toHaveBeenCalledWith('MovieDetailScreen', { movie: mockMovies[0] });
  });
});

describe('MovieItem', () => {
  it('renders premium badge if movie is premium', () => {
    const { getByText } = render(<MovieItem item={mockMovies[0]} />);
    expect(getByText('Premium')).toBeTruthy();
  });

  it('does not render premium badge if movie is not premium', () => {
    const { queryByText } = render(<MovieItem item={mockMovies[1]} />);
    expect(queryByText('Premium')).toBeNull();
  });

  it('navigates to MovieDetailScreen on press', () => {
    const navigate = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate });
    const { getByText } = render(<MovieItem item={mockMovies[0]} />);
    fireEvent.press(getByText('Movie One'));
    expect(navigate).toHaveBeenCalledWith('MovieDetailScreen', { movie: mockMovies[0] });
  });
});