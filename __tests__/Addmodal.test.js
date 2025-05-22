import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AddMovieModal from '../src/component/Addmodal';

describe('AddMovieModal - Unit Tests', () => {
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();
  const mockOnEdit = jest.fn();

  const defaultMovie = {
    title: 'Inception',
    description: 'A mind-bending thriller',
    genre: 'Sci-Fi',
    release_year: 2010,
    duration: 148,
    rating: 8.8,
    director: 'Christopher Nolan',
    main_lead: 'Leonardo DiCaprio',
    streaming_platform: 'Netflix',
    poster: 'https://example.com/poster.jpg',
    banner: 'https://example.com/banner.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all required input fields and buttons', () => {
    const {getByPlaceholderText, getByTestId, getByText} = render(
      <AddMovieModal
        visible={true}
        onClose={mockOnClose}
        onAdd={mockOnAdd}
        movie={null}
      />,
    );

    expect(getByPlaceholderText('Movie Title *')).toBeTruthy();
    expect(getByPlaceholderText('Streaming Platform *')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
    expect(getByText('CANCEL')).toBeTruthy();
  });

  it('calls onClose when cancel is pressed', () => {
    const {getByText} = render(
      <AddMovieModal
        visible={true}
        onClose={mockOnClose}
        onAdd={mockOnAdd}
        movie={null}
      />,
    );

    fireEvent.press(getByText('CANCEL'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onEdit with updated values in edit mode', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <AddMovieModal
        visible={true}
        onClose={mockOnClose}
        onAdd={mockOnAdd}
        onEdit={mockOnEdit}
        movie={defaultMovie}
      />,
    );

    fireEvent.changeText(
      getByPlaceholderText('Movie Title *'),
      'Inception Updated',
    );
    fireEvent.changeText(getByPlaceholderText('Genre *'), 'Action');

    fireEvent.press(getByTestId('submit-button'));

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('shows validation messages when submitting empty form', () => {
    const {getByTestId, getByText} = render(
      <AddMovieModal
        visible={true}
        onClose={mockOnClose}
        onAdd={mockOnAdd}
        movie={null}
      />,
    );

    fireEvent.press(getByTestId('submit-button'));

    expect(getByText('Title cannot be blank')).toBeTruthy();
    expect(
      getByText('Release year must be a valid 4-digit number'),
    ).toBeTruthy();
    expect(getByText('Duration must be a positive integer')).toBeTruthy();
    expect(getByText('Streaming platform is not valid')).toBeTruthy();
    expect(getByText("Main lead can't be blank")).toBeTruthy();
  });

  it('renders initial values when editing an existing movie', () => {
    const {getByPlaceholderText} = render(
      <AddMovieModal
        visible={true}
        onClose={mockOnClose}
        onAdd={mockOnAdd}
        onEdit={mockOnEdit}
        movie={defaultMovie}
      />,
    );

    expect(getByPlaceholderText('Movie Title *').props.value).toBe('Inception');
    expect(getByPlaceholderText('Description *').props.value).toBe(
      'A mind-bending thriller',
    );
    expect(getByPlaceholderText('Streaming Platform *').props.value).toBe(
      'Netflix',
    );
  });
});
