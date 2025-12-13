import React from 'react';
import MyContainer from '../../components/MyContainer/MyContainer';

const DashHome = () => {
    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>Welcome to StyleDecor Dashboard !</h1>

                </div>
            </MyContainer>

        </div>
    );
};

export default DashHome;