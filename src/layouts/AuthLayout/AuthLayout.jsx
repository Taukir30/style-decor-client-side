import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Outlet } from 'react-router';
import authImg from '../../assets/authImg.jpg'

const AuthLayout = () => {
    return (
        <div className='flex flex-col md:flex-row bg-[#ffefdc]'>
            <div className='w-full md:w-1/2 px-10 py-5'>
                <Logo></Logo>
                <div className='my-10 flex justify-center'>
                    <Outlet></Outlet>
                </div>
            </div>
            <div className='w-1/2 hidden md:flex min-h-screen bg-bottom-right bg-cover' style={{ backgroundImage: `url(${authImg})`}}>
                {/* <img src={authImg} className='h-[300px]' alt="" /> */}
            </div>
        </div>
    );
};

export default AuthLayout;