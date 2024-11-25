import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyConverter from './CurrencyConverter';

// Mock для fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        rates: {
          USD: 1,
          EUR: 0.85,
          UAH: 36.5,
        },
      }),
  })
);

describe('CurrencyConverter Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders the component correctly', async () => {
    render(<CurrencyConverter />);
    
    // Перевіряємо заголовок
    expect(screen.getByText(/конвертер валют/i)).toBeInTheDocument();

    // Поля введення
    expect(screen.getByLabelText(/в мене є:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/хочу придбати:/i)).toBeInTheDocument();

    // Кнопка збереження
    expect(screen.getByText(/зберегти результат/i)).toBeInTheDocument();
  });

  test('calculates the conversion correctly', async () => {
    render(<CurrencyConverter />);

    // Вводимо значення у поле "В мене є"
    const amountInput = screen.getByLabelText(/в мене є:/i);
    const currencyFromSelect = screen.getByLabelText(/в мене є:/i).closest('div').querySelector('select');
    const currencyToSelect = screen.getByLabelText(/хочу придбати:/i).closest('div').querySelector('select');

    userEvent.type(amountInput, '1000'); // Введення значення
    userEvent.selectOptions(currencyFromSelect, 'UAH'); // Вибір валюти "з"
    userEvent.selectOptions(currencyToSelect, 'USD'); // Вибір валюти "до"

    // Перевірка результату
    const resultField = screen.getByLabelText(/хочу придбати:/i).closest('div').querySelector('input');
    expect(resultField.value).toBe('27.40'); // Очікуваний результат для 1000 UAH → USD
  });

  test('saves conversion result to history', async () => {
    render(<CurrencyConverter />);

    // Вводимо значення у поле "В мене є"
    const amountInput = screen.getByLabelText(/в мене є:/i);
    const currencyFromSelect = screen.getByLabelText(/в мене є:/i).closest('div').querySelector('select');
    const currencyToSelect = screen.getByLabelText(/хочу придбати:/i).closest('div').querySelector('select');
    const saveButton = screen.getByText(/зберегти результат/i);

    userEvent.type(amountInput, '1000');
    userEvent.selectOptions(currencyFromSelect, 'UAH');
    userEvent.selectOptions(currencyToSelect, 'USD');
    fireEvent.click(saveButton); // Збереження результату

    // Перевірка історії
    const historyItem = await screen.findByText(/1000 uah → 27.40 usd/i);
    expect(historyItem).toBeInTheDocument();
  });

  test('clears history correctly', async () => {
    render(<CurrencyConverter />);

    const clearButton = screen.getByText(/очистити історію/i);

    fireEvent.click(clearButton);

    // Перевірка, що історія порожня
    const historyItems = screen.queryAllByText(/uah →/i);
    expect(historyItems).toHaveLength(0);
  });

  test('renders date picker and changes date', () => {
    render(<CurrencyConverter />);

    // Знаходимо елемент DatePicker
    const datePicker = screen.getByLabelText(/дата/i);
    expect(datePicker).toBeInTheDocument();

    // Емулюємо зміну дати
    fireEvent.change(datePicker, { target: { value: '2023-11-25' } });
    expect(datePicker.value).toBe('2023-11-25');
  });
});
