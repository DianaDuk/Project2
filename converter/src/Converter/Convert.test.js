import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Convert from './Convert';

describe('Convert Component', () => {
  test('renders the convert form', () => {
    render(<Convert />);

    // Поля введення
    expect(screen.getByLabelText(/сума для конвертації/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/валюта із/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/валюта у/i)).toBeInTheDocument();
  });

  test('handles user input and displays result', () => {
    render(<Convert />);

    // Емулюємо введення даних
    const inputAmount = screen.getByLabelText(/сума для конвертації/i);
    const fromSelect = screen.getByLabelText(/валюта із/i);
    const toSelect = screen.getByLabelText(/валюта у/i);
    const convertButton = screen.getByText(/конвертувати/i);

    fireEvent.change(inputAmount, { target: { value: '500' } });
    fireEvent.change(fromSelect, { target: { value: 'USD' } });
    fireEvent.change(toSelect, { target: { value: 'UAH' } });
    fireEvent.click(convertButton);

    // Перевіряємо результат
    expect(screen.getByText(/результат:/i)).toBeInTheDocument();
  });
});
