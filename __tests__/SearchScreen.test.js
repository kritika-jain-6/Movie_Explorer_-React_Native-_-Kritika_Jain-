import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import SearchScreen from '../src/screen/SearchScreen';
import {searchMovies, filterMovies} from '../src/api/MovieAPI';
import {NavigationProp} from '@react-navigation/native';

jest.mock('../src/api/MovieAPI', () => ({
  searchMovies: jest.fn(),
  filterMovies: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('SearchScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the SearchScreen correctly', () => {
    const {getByPlaceholderText, getByText, getByTestId} = render(
      <SearchScreen navigation={mockNavigation} />,
    );

    expect(getByPlaceholderText('Movies, genres...')).toBeTruthy();
    expect(getByText('Categories')).toBeTruthy();
    expect(getByText('Recent Searches')).toBeTruthy();

  });

  it('should perform a search when the search input is submitted', async () => {
    const mockMovies = {
      movies: [
        {id: '1', title: 'Movie 1', poster_url: 'https://example.com/movie1.jpg'},
        {id: '2', title: 'Movie 2', poster_url: 'https://example.com/movie2.jpg'},
      ],
    };
    searchMovies.mockResolvedValue(mockMovies);

    const {getByPlaceholderText, getByTestId, getByText} = render(
      <SearchScreen navigation={mockNavigation} />,
    );

    const searchInput = getByPlaceholderText('Movies, genres...');
    fireEvent.changeText(searchInput, 'test movie');
    fireEvent(searchInput, 'submitEditing');



    await waitFor(() => {
      expect(getByText('Movie 1')).toBeTruthy();
      expect(getByText('Movie 2')).toBeTruthy();
    });

    expect(searchMovies).toHaveBeenCalledWith('test movie');
  });

  it('should display trending movies on initial render', async () => {
    const mockTrendingMovies = {
      movies: [
        {id: '1', title: 'Trending Movie 1', poster_url: 'https://example.com/trending1.jpg'},
        {id: '2', title: 'Trending Movie 2', poster_url: 'https://example.com/trending2.jpg'},
      ],
    };
    searchMovies.mockResolvedValue(mockTrendingMovies);

    const {getByText} = render(<SearchScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getByText('Trending Movie 1')).toBeTruthy();
      expect(getByText('Trending Movie 2')).toBeTruthy();
    });

    expect(searchMovies).toHaveBeenCalledWith('');
  });

  it('should filter movies by genre when a category is selected', async () => {
    const mockFilteredMovies = {
      movies: [
        {id: '1', title: 'Action Movie 1', poster_url: 'https://example.com/action1.jpg'},
        {id: '2', title: 'Action Movie 2', poster_url: 'https://example.com/action2.jpg'},
      ],
    };
    filterMovies.mockResolvedValue(mockFilteredMovies);

    const {getByText} = render(<SearchScreen navigation={mockNavigation} />);

    const actionCategory = getByText('Action');
    fireEvent.press(actionCategory);

    await waitFor(() => {
      expect(getByText('Action Movie 1')).toBeTruthy();
      expect(getByText('Action Movie 2')).toBeTruthy();
    });

    expect(filterMovies).toHaveBeenCalledWith('Action');
  });

  it('should update recent searches when a search is performed', async () => {
    const mockMovies = {
      movies: [
        {id: '1', title: 'Movie 1', poster_url: 'https://example.com/movie1.jpg'},
      ],
    };
    searchMovies.mockResolvedValue(mockMovies);

    const {getByPlaceholderText, getByText} = render(
      <SearchScreen navigation={mockNavigation} />,
    );

    const searchInput = getByPlaceholderText('Movies, genres...');
    fireEvent.changeText(searchInput, 'New Search');
    fireEvent(searchInput, 'submitEditing');

    await waitFor(() => {
      expect(getByText('New Search')).toBeTruthy(); // Recent search
    });
  });


});
