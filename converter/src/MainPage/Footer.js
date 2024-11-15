import React from "react";
import logo from '../MainPage/logo.png';
import phone from '../MainPage/phone.png';
import phone1 from '../MainPage/phone1.png';
import {FaFacebook, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa';

export function Footer() {
    return(
        <div className='bg-white-400 py-8 px-4'>
            <div className="container mx-auto grid grid-cols-5 gap-10">
                <div className="flex flex-col items-start space-y-2">
                    <div className="flex items-center space-x-2">
                    <img src={logo} alt='Logo' className='w-8 h-8' />
                    <h3 className='text-xl font-semibold'>Чіп Чендж</h3>
                    </div>
                    <p className="text-gray-600 mt-2">04128, м.Київ, вул. Хрещатик, 19</p>
                    <p className="text-gray-600">Ліцензія НБУ №156</p>
                    <p className="text-gray-500 mt-4">Ⓒ ПАТ ЧіпЧендж, 2019-2023</p>
                </div>

                <div className="flex flex-col items-center space-y-1">
                    <p href='#' className='hover:text-gray-300'>Послуги</p>
                    <p href='#' className='hover:text-gray-300'>Конвертер валют</p>
                    <p href='#' className='hover:text-gray-300'>Контакти</p>
                    <p href='#' className='hover:text-gray-300'>Задати питання</p>
                </div>

                <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center space-x-2">
                    <img src={phone} alt='Phone' className='h-8 w-4' />
                    <p className="text-lg font-semibold">3773</p>
                    </div>
                    <p className="text-gray-600">Цілодобова підтримка</p>
                </div>

                <div className="flex flex-col items-start space-y-1">
                <div className="flex items-center space-x-2">
                    <img src={phone1} alt='Phone' className='h-8 w-8 rounded-full' />
                    <p className="text-lg font-semibold"> 8 800 111 22 33</p>
                    </div>
                    <p className="text-gray-600">Безкоштовно для дзвінків в межах України</p>
                </div>

                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                        <FaFacebook size={24} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-400">
                        <FaTwitter size={24} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-pink-600">
                        <FaInstagram size={24} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-red-600">
                        <FaYoutube size={24} />
                    </a>
                </div>
                 </div>   
                 </div> 
    );
}