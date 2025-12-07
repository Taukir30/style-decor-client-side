import React from 'react';
import { Link } from 'react-router';
import logoImg from '../../assets/sdlogoo.png';

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center gap-1'>
                <img src={logoImg} className='h-[26px] ' alt="" />
                <div>
                    <span className='text-2xl font-bold text-[#CA5310]'>Style</span>
                    <span className='text-2xl font-bold text-[#8F250C]'>Decor</span>
                </div>
            </div>
        </Link>
    );
};

export default Logo;