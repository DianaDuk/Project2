import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from './Banner';

describe('Banner Component', () => {
  test('renders the banner content', () => {
    render(<Banner />);

    // Перевіряємо, що текст "Конвертер валют" присутній
    expect(screen.getByText(/конвертер валют/i)).toBeInTheDocument();

    // Перевіряємо наявність зображення чи інших елементів
    const bannerImage = screen.getByAltText(/banner image/i);
    expect(bannerImage).toBeInTheDocument();
  });

  test('renders the description', () => {
    render(<Banner />);
    expect(screen.getByText(/обмін валют за вигідним курсом/i)).toBeInTheDocument();
  });
});
