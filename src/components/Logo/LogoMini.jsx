import React from 'react';
import logoImg from '../../assets/sdlogoo.png';
import { Link } from 'react-router';

const LogoMini = () => {
    return (
        <Link to='/'>
            <div className='flex items-center gap-1'>
                <img src={logoImg} className='h-[26px] ' alt="" />
            </div>
        </Link>
    );
};

export default LogoMini;