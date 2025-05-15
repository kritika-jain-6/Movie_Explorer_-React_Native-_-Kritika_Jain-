import React from 'react';
import { render, act } from '@testing-library/react-native';
import PaymentScreen from '../src/screen/PaymentCard';
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';


jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(),
    useNavigation: jest.fn(),
}));
jest.mock('react-native-webview', () => ({
    WebView: jest.fn().mockImplementation(({ onNavigationStateChange, renderLoading }) => {
       
        if (renderLoading) renderLoading();
        return null;
    }),
}));

describe('PaymentScreen', () => {
    const mockNavigate = jest.fn();
    const mockGoBack = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useNavigation.mockReturnValue({ navigate: mockNavigate, goBack: mockGoBack });
        useRoute.mockReturnValue({ params: { url: 'https://payment.com/start' } });
    });

    it('renders correctly', () => {
        const { toJSON } = render(<PaymentScreen />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('passes the correct url to WebView', () => {
        let webviewProps;
        WebView.mockImplementationOnce((props) => {
            webviewProps = props;
            return null;
        });
        render(<PaymentScreen />);
        expect(webviewProps.source).toEqual({ uri: 'https://payment.com/start' });
    });

    it('goes back on cancel url', () => {
        let webviewProps;
        WebView.mockImplementationOnce((props) => {
            webviewProps = props;
            return null;
        });
        render(<PaymentScreen />);
        act(() => {
            webviewProps.onNavigationStateChange({ url: 'https://payment.com/cancel' });
        });
    });

    it('does not navigate or go back on unrelated url', () => {
        let webviewProps;
        WebView.mockImplementationOnce((props) => {
            webviewProps = props;
            return null;
        });
        render(<PaymentScreen />);
        act(() => {
            webviewProps.onNavigationStateChange({ url: 'https://payment.com/other' });
        });
        expect(mockNavigate).not.toHaveBeenCalled();
        expect(mockGoBack).not.toHaveBeenCalled();
    });

    it('renders loading indicator', () => {
        let loadingRendered = false;
        WebView.mockImplementationOnce((props) => {
            if (props.renderLoading) {
                const loading = props.renderLoading();
                loadingRendered = !!loading;
            }
            return null;
        });
        render(<PaymentScreen />);
        expect(loadingRendered).toBe(true);
    });
});