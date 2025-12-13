import React from 'react';
import MyContainer from './MyContainer/MyContainer';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className='py-15'>
            <MyContainer>
                <h2 className='text-center my-10 text-4xl text-red-600'>Forbidden Access</h2>

                <div className='flex justify-center my-5 py-5'>
                    <Link to='/' className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]'>Go Home</Link>
                </div>
            </MyContainer>
        </div>
    );
};

export default Forbidden;