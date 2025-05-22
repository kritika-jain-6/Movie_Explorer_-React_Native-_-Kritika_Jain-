import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Cancel from '../src/screen/Cancel';


const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('Cancel Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all static content', () => {
    const { getByText, getAllByText } = render(<Cancel />);
    expect(getByText('Subscription Cancelled')).toBeTruthy();
    expect(getByText('Your subscription has been cancelled')).toBeTruthy();
    expect(getByText("You don't have a premium plan")).toBeTruthy();
    expect(getByText('Return to Subscription')).toBeTruthy();

    expect(getAllByText('Subscription Cancelled').length).toBe(1);
  });

  

  it('button triggers navigation to Subscription', () => {
    const { getByText } = render(<Cancel />);
    const button = getByText('Return to Subscription');
    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalledWith('Subscription');
  });



});