import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CurrencyConverter = () => {
  const { register, watch } = useForm();
  const [exchangeRates, setExchangeRates] = useState({});
  const [result, setResult] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Завантаження курсів валют
  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => response.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((error) => console.error('Error loading exchange rates:', error));
  }, []);

  // Слухачі форми
  const amount = watch('amount', 1000); // Значення за замовчуванням
  const currencyFrom = watch('currencyFrom', 'UAH');
  const currencyTo = watch('currencyTo', 'USD');

  // Обчислення результату
  useEffect(() => {
    if (exchangeRates[currencyFrom] && exchangeRates[currencyTo]) {
      const convertedAmount =
        (amount / exchangeRates[currencyFrom]) * exchangeRates[currencyTo];
      setResult(convertedAmount.toFixed(2));
    }
  }, [amount, currencyFrom, currencyTo, exchangeRates]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      {/* Заголовок */}
      <h2 className="text-2xl font-semibold mb-4 text-center">Конвертер валют</h2>

      <form className="space-y-4">
        {/* Поля "В мене є" та "Хочу придбати" */}
        <div className="flex items-center gap-4">
          {/* В мене є */}
          <div className="flex-1">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              В мене є:
            </label>
            <div className="flex gap-2">
              <input
                {...register('amount')}
                type="number"
                id="amount"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <select
                {...register('currencyFrom')}
                id="currencyFrom"
                className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Стрілочка */}
          <div className="text-center">
            <span className="text-2xl">⇄</span>
          </div>

          {/* Хочу придбати */}
          <div className="flex-1">
            <label htmlFor="currencyTo" className="block text-sm font-medium text-gray-700">
              Хочу придбати:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={result || ''}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
              />
              <select
                {...register('currencyTo')}
                id="currencyTo"
                className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Вибір дати */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Дата
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Кнопка */}
        <div className="text-center">
          <button
            type="button"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
            onClick={() => alert(`Дата: ${selectedDate.toLocaleDateString()}\nРезультат: ${result}`)}
          >
            Зберегти результат
          </button>
        </div>
      </form>
    </div>
  );
};

export default CurrencyConverter;
