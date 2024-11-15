import React from 'react';
import {useNavigate} from 'react-router-dom';
import logo from '../MainPage/logo.png';
import cabinet from '../MainPage/cabinet.png';
import '../MainPage/Header.css'
import { Banner } from './Banner';
import { Main } from './Main';
import { Footer } from './Footer';

export function Header() {
    const navigate = useNavigate();

    return(
        <div className='font-sans'>
            <header className='bg-gradient-to-r bg-white p-4 flex justify-between items-center'>

                <div className='flex items-center'>
                    <img src={logo} alt='Logo' className='w-8 h-8' />
                    <span className='text-2xl font-semibold'>Чіп Чендж</span>
                 </div>   

                    <nav className='flex space-x-10'>
                        <a href='#' className='hover:text-gray-300'>Послуги</a>
                        <a href='#' className='hover:text-gray-300'>Конвертер валют</a>
                        <a href='#' className='hover:text-gray-300'>Контакти</a>
                        <a href='#' className='hover:text-gray-300'>Задати питання</a>
                    </nav>

                    <div className='flex items-center'>
                         <span className='mr-2'>Особистий кабінет</span>
                        <img src={cabinet} alt='Cabinet' className='h-8 w-8 rounded-full'></img>
                      </div>
            </header>

            <Banner />
            <Main />
            <Footer />
        </div>
    );
}