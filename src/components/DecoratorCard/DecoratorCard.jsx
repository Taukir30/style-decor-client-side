import React from 'react';
import { FcRating } from 'react-icons/fc';
import { Link } from 'react-router';

const DecoratorCard = ({ decorator }) => {

    console.log(decorator)

    return (
        <div className="flex flex-col sm:flex-row max-w-2xl w-full bg-[#FFFBE6] rounded-2xl overflow-hidden shadow-sm">
            <div className="w-full sm:w-5/12 h-64 sm:h-auto">
                {/* <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover object-top" 
                /> */}
                <div className='w-full h-full bg-cover bg-center' style={{ backgroundImage: `url(${decorator.photoURL})` }}></div>
            </div>
            <div className="w-full sm:w-7/12 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-1">
                    <span>Location</span>
                    <span>–</span>
                    <span className="text-primary">{decorator.location}</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2 font-sans tracking-tight">
                    Alexa Wick
                </h2>
                <p className="text-gray-600 font-medium mb-8">
                    Specialities: <span className="text-primary">{decorator.experties}</span>
                </p>
                <div>
                    <h3 className="text-gray-700 font-bold mb-3 text-lg">Rating:</h3>
                    <div className="flex gap-4">
                        <FcRating size={20} />
                        <span className='text-primary'>{decorator.rating}</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DecoratorCard;