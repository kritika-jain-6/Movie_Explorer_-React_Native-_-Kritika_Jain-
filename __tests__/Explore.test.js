import React from 'react';
import { render } from '@testing-library/react-native';
import Explore from '../src/component/Explore';
import { NavigationContainer } from '@react-navigation/native';

describe('Explore Component', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <Explore />
      </NavigationContainer>
    );
  });
});
