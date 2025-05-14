import React from 'react';
import { render } from '@testing-library/react-native';
import BornCard from '../src/component/BornCard';

describe('BornCard Component', () => {
  it('should render all celebrity cards correctly', () => {
    const { getByTestId, getByText } = render(<BornCard />);

    const celebrities = [
      {
        id: 1,
        name: 'Shah Rukh Khan',
        age: 58,
      },
      {
        id: 4,
        name: 'Deepika Padukone',
        age: 38,
      },
      {
        id: 5,
        name: 'Priyanka Chopra',
        age: 43,
      },
      {
        id: 7,
        name: 'Leonardo DiCaprio',
        age: 49,
      },
      {
        id: 8,
        name: 'Brad Pitt',
        age: 60,
      },
      {
        id: 10,
        name: 'Meryl Streep',
        age: 75,
      },
      {
        id: 9,
        name: 'Tom Cruise',
        age: 61,
      },
      {
        id: 11,
        name: 'Scarlett Johansson',
        age: 40,
      },
      {
        id: 12,
        name: 'Jennifer Lawrence',
        age: 33,
      },
    ];

    celebrities.forEach(({ id, name, age }) => {
      expect(getByTestId(`celebrity-card-${id}`)).toBeTruthy();
      expect(getByTestId(`celebrity-image-${id}`)).toBeTruthy();
      expect(getByTestId(`celebrity-name-${id}`)).toHaveTextContent(name);
      expect(getByTestId(`celebrity-age-${id}`)).toHaveTextContent(age.toString());
    });
  });
});
