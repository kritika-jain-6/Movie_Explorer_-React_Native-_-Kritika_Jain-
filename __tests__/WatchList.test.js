import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WatchList from '../src/screen/WatchList';
import { useWatchlist } from '../src/context/Watchlist';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../src/context/Watchlist', () => ({
  useWatchlist: jest.fn(),
}));

describe('WatchList Screen (with testID & getByText)', () => {
  const mockGoBack = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ goBack: mockGoBack });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty watchlist with correct testID', () => {
    useWatchlist.mockReturnValue({ watchlist: [] });

    const { getByTestId, getByText } = render(<WatchList />);
    expect(getByTestId('screen-title')).toBeTruthy();
    expect(getByText('My Watchlist')).toBeTruthy();
    expect(getByTestId('empty-message')).toBeTruthy();
  });

  test('renders watchlist item with correct testID and text', () => {
    const movie = {
      id: '1',
      title: 'Inception',
      genre: 'Sci-Fi',
      release_year: '2010',
      rating: 8.8,
      poster_url: 'https://example.com/poster.jpg',
    };

    useWatchlist.mockReturnValue({ watchlist: [movie] });

    const { getByText, getByTestId } = render(<WatchList />);

    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('Sci-Fi | 2010')).toBeTruthy();
    expect(getByText('⭐ 8.8/10')).toBeTruthy();
    expect(getByTestId('watchlist-card-1')).toBeTruthy();
  });

  test('back button triggers navigation.goBack', () => {
    useWatchlist.mockReturnValue({ watchlist: [] });

    const { getByTestId } = render(<WatchList />);
    const backBtn = getByTestId('back-button');

    fireEvent.press(backBtn);
    expect(mockGoBack).toHaveBeenCalled();
  });
});
