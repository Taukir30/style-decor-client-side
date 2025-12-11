import React from 'react';
import MyContainer from '../../../components/MyContainer/MyContainer';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';

const Payment = () => {

    const { id } = useParams();

    const axiosSecure = useAxiosSecure();

    //tanstack for loading booking deatails
    const { isLoading, data: bookingDetails } = useQuery({
        queryKey: ['bookingDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/${id}`);
            return res.data;
        }
    })

    console.log(bookingDetails)

    //hitting payment api using axios secure
    const handlePayment = async () => {
        const paymentInfo = {
            price: bookingDetails.servicePrice,
            bookingId: bookingDetails._id,
            customerEmail: bookingDetails.email,
            serviceName: bookingDetails.serviceName
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log( res.data );
        window.location.assign(res.data.url);
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-2xl text-secondary'>Please pay the due to confirm booking.</h1>

                    <p><span className='text-secondary'>Pay for: </span><span className='font-bold mx-2'>{bookingDetails.serviceName}</span></p>
                    <p><span className='text-secondary'>Due: </span><span className='font-bold mx-2'>{bookingDetails.servicePrice}</span></p>
                    <button onClick={handlePayment} className='btn btn-secondary rounded-4xl w-20'>Pay</button>
                </div>
            </MyContainer>
        </div>
    );
};

export default Payment;