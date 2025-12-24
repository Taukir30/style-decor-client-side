import React from 'react';
import errorImg from '../../assets/404.jpg';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div>
            <div className='w-full h-[400px] bg-[#ffefdc] rounded-3xl py-15 flex flex-col justify-center items-center gap-3 min-h-screen'>
                <img src={errorImg} className='w-[400px] rounded-4xl mb-5' alt="" />

                <h1 className='text-2xl text-secondary my-3'>Page Not Found !!!</h1>

                <Link to='/' className='btn btn-primary w-[10%] text-secondary'>Go Home</Link>
            </div>
        </div>
    );
};

export default Error;