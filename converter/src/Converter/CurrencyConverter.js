import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CurrencyConverter = () => {
  const { register, watch } = useForm();
  const [exchangeRates, setExchangeRates] = useState({});
  const [result, setResult] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => response.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((error) => console.error('Error loading exchange rates:', error));
  }, []);

  const amount = watch('amount', 1000);
  const currencyFrom = watch('currencyFrom', 'UAH');
  const currencyTo = watch('currencyTo', 'USD');

  useEffect(() => {
    if (exchangeRates[currencyFrom] && exchangeRates[currencyTo]) {
      const convertedAmount =
        (amount / exchangeRates[currencyFrom]) * exchangeRates[currencyTo];
      setResult(convertedAmount.toFixed(2));
    }
  }, [amount, currencyFrom, currencyTo, exchangeRates]);

  const handleSaveResult = () => {
    const newEntry = {
      date: selectedDate.toLocaleDateString(),
      amount,
      from: currencyFrom,
      to: currencyTo,
      result,
    };

    const updatedHistory = [...history, newEntry];

    // Очищення, якщо записів більше 10
    if (updatedHistory.length > 10) {
      setHistory([newEntry]);
    } else {
      setHistory(updatedHistory);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Конвертер валют</h2>

      <form className="space-y-4">
        <div className="flex items-center gap-4">
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
          <div className="text-center">
            <span className="text-2xl">⇄</span>
          </div>
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
       <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Дата
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </form>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handleSaveResult}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Зберегти результат
        </button>
      </div>

      {/* Історія */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Історія конвертації</h3>
          <button
            onClick={handleClearHistory}
            className="text-sm text-blue-500 underline hover:text-blue-700"
          >
            Очистити історію
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {history.map((entry, index) => (
            <React.Fragment key={index}>
              <div className="text-center bg-blue-50 p-2 rounded-md shadow">
                <div>{entry.date}</div>
                <div>
                  {entry.amount} {entry.from} → {entry.result} {entry.to}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;