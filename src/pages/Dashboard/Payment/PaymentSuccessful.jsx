import React, { useEffect, useState } from 'react';
import MyContainer from '../../../components/MyContainer/MyContainer';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccessful = () => {

    const [paymentInfo, setPaymentInfo] = useState();

    const [searchParams] = useSearchParams();

    const axiosSecure = useAxiosSecure();

    const sessionId = searchParams.get('session_id');
    console.log(sessionId)

    useEffect( () => {
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then( res => {
                    console.log(res.data)
                    setPaymentInfo(
                        {
                            transactionId: res.data.transactionId,
                            trackingId: res.data.trackingId
                        }
                    )
                })
        }
    }, [sessionId, axiosSecure])

    return (
        <div className='my-10'>
            <MyContainer>
                <h1 className='text-xl text-green-700'>Payment Successful</h1>

                <p className='text-primary my-5'>Transaction ID: <span className='font-bold text-secondary'> {paymentInfo.transactionId}</span></p>
                <p className='text-primary'>Project Tracking ID: <span className='font-bold text-secondary'> {paymentInfo.trackingId}</span></p>

                <Link to='/dashboard/my-bookings' className='btn btn-outline btn-secondary my-5 rounded-4xl'>My Bookings</Link>
            </MyContainer>
        </div>
    );
};

export default PaymentSuccessful;