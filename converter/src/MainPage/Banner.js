import React from "react";
import bgImage from '../MainPage/bgImage.png';
import cardImage from '../MainPage/cardImage.png';
import { Link } from "react-router-dom";



export function Banner() {
    return(
        <div 
            className="bg-cover bg-center h-[400px] flex justify-center items-center text-center"
            style={{backgroundImage: `url(${bgImage})`}}
            >
          <div className="max-w-md px-6 text-white">
            <h1 className="text-white text-5xl font-semibold font-Roboto">Чіп Чендж</h1>
            <p className="text-white text-xl">Обмінник валют - навчальний</p>
            <Link to="/convert">
            <button className="mt-4 bg-white text-gray-400 font-semibold py-2 px-4 rounded">
                Конвертер валют
            </button>
            </Link>
          </div>
          <img src={cardImage} alt="Card" className="w-[341px] h-[216px] ml-[300px]" />

          
            </div>
    );
}