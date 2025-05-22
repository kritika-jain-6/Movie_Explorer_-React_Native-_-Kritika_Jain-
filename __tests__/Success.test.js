import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Success from '../src/screen/Success';

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

describe('Success Screen', () => {
    it('renders all static texts', () => {
        const { getByText } = render(<Success />);
        expect(getByText('Subscription Successful')).toBeTruthy();
        expect(getByText('Welcome to the Binge Premium Movies')).toBeTruthy();
        expect(getByText('Your premium plan starts today')).toBeTruthy();
        expect(getByText('Continue')).toBeTruthy();
    });


    it('navigates to Home when Continue is pressed', () => {
        const mockNavigate = jest.fn();
        jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: mockNavigate });

        const { getByText } = render(<Success />);
        fireEvent.press(getByText('Continue'));
        expect(mockNavigate).toHaveBeenCalledWith('Home');
    });
});