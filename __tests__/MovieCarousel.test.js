import React from 'react';
import { render } from '@testing-library/react-native';
import { MovieCarousel } from '../src/component/MovieCarousel';

jest.mock('../src/api/MovieAPI', () => ({
  getMovieDetails: jest.fn(() => new Promise(() => {})),
}));

describe('MovieCarousel', () => {
  it('renders loading state correctly', () => {
    const { getByText, getByTestId } = render(<MovieCarousel />);


    const loadingIndicator = getByTestId('loading-indicator');
    const loadingText = getByText('Loading movies...');

    expect(loadingIndicator).toBeTruthy();
    expect(loadingText).toBeTruthy();
  });
});
