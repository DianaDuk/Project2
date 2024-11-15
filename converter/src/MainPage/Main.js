import React from "react";
import { Link } from "react-router-dom";
import blackCard from '../MainPage/blackCard.png'

export function Main() {
    return(
        <div className="bg-gradient-to-r bg-white p-10 flex justify-center items-center">
            <div className="flex flex-col text-center items-center md:text-left transform translate-y-2 ">
                <h2 className="text-3xl font-bold mb-4 mr-10 ">Конвертер валют</h2>
                <div className="space-y-1">
                <p className="whitespace-nowrap">Переважна діяльність банківської</p>
                <p className="whitespace-nowrap">групи за останні чотири звітні квартали</p>
                <p className="whitespace-nowrap">становить 50 і більше відсотків.</p>
                </div>
                <Link to='/convert'>
                <button className="mr-24 mt-6 bg-blue-700 text-white-400 font-semibold py-2 px-4 rounded">
                Конвертувати валюту
                </button>
                </Link>
            </div>
            <img src={blackCard} alt="Card" className="w-[436px] h-[314px] md:ml-16" />
        </div>
    );
}