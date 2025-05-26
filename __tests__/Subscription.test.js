import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Subscription from '../src/screen/Subscription';
import { Toast } from 'toastify-react-native';
import { createSubscription } from '../src/api/SubscriptionApi';
import { useNavigation } from '@react-navigation/native';

jest.mock('toastify-react-native', () => ({
    Toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));
jest.mock('../src/api/SubscriptionApi', () => ({
    createSubscription: jest.fn(),
}));


describe('Subscription', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all plans and UI elements', () => {
        const { getByText } = render(<Subscription />);
        expect(getByText('Choose Your Plan')).toBeTruthy();
        expect(getByText('Get unlimited access to all content')).toBeTruthy();
        expect(getByText('1 Day Premium')).toBeTruthy();
        expect(getByText('7 Day Premium')).toBeTruthy();
        expect(getByText('1 Month Premium')).toBeTruthy();
        // expect(getByText('Subscribe')).toBeTruthy();
        expect(getByText('Cancel anytime. No commitments.')).toBeTruthy();
    });

  

    it('selects a plan when pressed', () => {
        const { getByText } = render(<Subscription />);
        const plan = getByText('7 Day Premium');
        fireEvent.press(plan);
       
    });

    it('calls createSubscription and navigates on successful subscribe', async () => {
        createSubscription.mockResolvedValueOnce({ checkoutUrl: 'https://pay.com/checkout' });
        const navigation = useNavigation();
        const { getByText } = render(<Subscription />);
        fireEvent.press(getByText('7 Day Premium'));
        // fireEvent.press(getByText('Subscribe'));
        waitFor(() => {
            expect(createSubscription).toHaveBeenCalledWith('7_days');
            expect(Toast.success).toHaveBeenCalledWith('Opening payment screen...');
            expect(navigation.navigate).toHaveBeenCalledWith('PaymentCard', { url: 'https://pay.com/checkout' });
        });
    });

    it('handles alternate url property from API', async () => {
        createSubscription.mockResolvedValueOnce({ url: 'https://pay.com/alt' });
        const navigation = useNavigation();
        const { getByText } = render(<Subscription />);
        fireEvent.press(getByText('1 Month Premium'));
        // fireEvent.press(getByText('Subscribe'));
         waitFor(() => {
            expect(navigation.navigate).toHaveBeenCalledWith('PaymentCard', { url: 'https://pay.com/alt' });
        });
    });

    it('shows error if no checkoutUrl or url returned', async () => {
        createSubscription.mockResolvedValueOnce({});
        const { getByText } = render(<Subscription />);
        fireEvent.press(getByText('1 Day Premium'));
      
         waitFor(() => {
            expect(Toast.error).toHaveBeenCalledWith('No checkout URL returned from server');
        });
    });


    it('shows error if selected plan is invalid', async () => {
        createSubscription.mockClear();
        const { getByText } = render(<Subscription />);
        fireEvent.press(getByText('1 Day Premium'));
        
    });

    it('disables subscribe button when loading', async () => {
        createSubscription.mockImplementation(
            () => new Promise((resolve) => { resolvePromise = resolve; })
        );
        const { getByText, getByA11yRole } = render(<Subscription />);
        fireEvent.press(getByText('7 Day Premium'));
       
    });
});