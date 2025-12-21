import React from 'react';
import Loading from '../Loading/Loading';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Widget from '../Widget/Widget';

const UserDash = () => {

    const { user, loading } = useAuth();

    const axiosSecure = useAxiosSecure();

    //tankstack for loading completed bookings
    // const { isLoading, data: completedBookings = [] } = useQuery({
    //     queryKey: ['completedBookings', user.email, 'completed'],
    //     enabled: !!user?.email,
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/booking/decorator?decoratorEmail=${user.email}&status=completed`);
    //         return res.data;
    //     }
    // })

    const { isLoading, data: allBooking = [] } = useQuery({
        queryKey: ['allBooking', user.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/decorator?decoratorEmail=${user.email}&status=assigned`);
            return res.data;
        }
    })

    const totalProjects = allBooking.length;

    // console.log(runnignProject)

    if (loading || isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='bg-white rounded-xl shadow-xl flex flex-col gap-3'>

            <h1 className='text-xl text-secondary font-bold p-5 border-b border-[#ffe3c2]'>User Profile Overview</h1>

            <div className='p-5 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5'>
                <Widget title={'Total Projects'} data={totalProjects} color={'orange'}></Widget>
                
                
            </div>

        </div>
    );
};

export default UserDash;