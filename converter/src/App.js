import logo from './logo.svg';
import './App.css';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './MainPage/Header';
import { Convert } from './Converter/Convert';


function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/convert' element={<Convert />} />
      </Routes>
    </Router>
  );
}

export default App;
