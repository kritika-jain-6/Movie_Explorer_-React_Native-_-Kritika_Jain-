
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StreamingScreen from '../src/component/Explore';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('StreamingScreen', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: navigateMock });
  });

  it('renders all streaming services', () => {
    const { getByText, getAllByRole } = render(<StreamingScreen />);
    
    expect(getByText('Amazon')).toBeTruthy();
    expect(getByText('Netflix')).toBeTruthy();
    expect(getByText('HBO')).toBeTruthy();
    expect(getByText('Hulu')).toBeTruthy();
  });

 


});
