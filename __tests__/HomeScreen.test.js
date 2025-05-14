import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Home from '../src/screen/HomeScreen';


describe('Home Screen ', () => {
    it('render correctly',()=>{
        const { getByText } = render(<Home />);
        expect(getByText("Explore What's Streaming")).toBeTruthy();
        expect(getByText('What to do')).toBeTruthy();
        expect(getByText('Top Ten')).toBeTruthy();
        expect(getByText('Born Today')).toBeTruthy();

    });

});
