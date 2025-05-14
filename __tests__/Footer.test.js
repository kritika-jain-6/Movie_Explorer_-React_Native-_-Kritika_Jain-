import React from 'react';
import { render } from '@testing-library/react-native';
import Footer from '../src/component/Footer';

describe('Footer Component', () => {
  it('should render the footer text correctly', () => {
    const { getByTestId } = render(<Footer />);
    const footerText = getByTestId('footer-text');


    expect(footerText).toHaveTextContent('Follow Movie Explorer on social');
  });

  it('should render 4 social media icons', () => {
    const { getAllByTestId } = render(<Footer />);


    const icons = getAllByTestId(/icon-/);
    expect(icons.length).toBe(4);
    expect(icons[0].props.source.uri).toBe('https://i.pinimg.com/736x/cd/ab/36/cdab36e9fa618a661e7c208efde0461c.jpg');
    expect(icons[1].props.source.uri).toBe('https://i.pinimg.com/736x/8c/98/fb/8c98fbcd5ae391c4f2fc47bef0be2b5f.jpg');
    expect(icons[2].props.source.uri).toBe('https://i.pinimg.com/736x/b2/68/83/b268838fe5a0c0ca504c2fc103843ae3.jpg');
    expect(icons[3].props.source.uri).toBe('https://i.pinimg.com/736x/4f/74/7e/4f747ed96769c0d8a939f98ad23f371b.jpg');
  });
});
