import React from 'react';
import { Link } from 'react-router';
import MyContainer from '../../../components/MyContainer/MyContainer';

const PaymentCancelled = () => {
    return (
        <div className='my-10'>
            <MyContainer>
                <h1 className='text-xl text-red-700'>Payment Cancelled</h1>
                <h2>Please, try again</h2>
                <Link to='/dashboard/my-bookings' className='btn btn-outline btn-secondary my-5 rounded-4xl'>Try again</Link>
            </MyContainer>
        </div>
    );
};

export default PaymentCancelled;