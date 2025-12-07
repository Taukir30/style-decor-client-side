import React from 'react';
import errorImg from '../../assets/error.png';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div>
            <div className='w-full h-[400px] bg-white rounded-3xl my-5 py-15 flex flex-col items-center gap-3'>
            <img src={errorImg} className='w-[200px]' alt="" />
            <Link to='/' className='btn btn-primary w-[10%] text-secondary'>Go Home</Link>
        </div>
        </div>
    );
};

export default Error;