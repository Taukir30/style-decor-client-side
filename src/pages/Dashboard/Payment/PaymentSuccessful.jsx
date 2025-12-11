import React, { useEffect } from 'react';
import MyContainer from '../../../components/MyContainer/MyContainer';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccessful = () => {

    const [searchParams] = useSearchParams();

    const axiosSecure = useAxiosSecure();

    const sessionId = searchParams.get('session_id');
    console.log(sessionId)

    useEffect( () => {
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then( res => {
                    console.log(res.data)
                })
        }
    }, [sessionId, axiosSecure])

    return (
        <div className='my-10'>
            <MyContainer>
                <h1 className='text-xl text-green-700'>Payment Successful</h1>

                <Link to='/dashboard/my-bookings' className='btn btn-outline btn-secondary my-5 rounded-4xl'>My Bookings</Link>
            </MyContainer>
        </div>
    );
};

export default PaymentSuccessful;