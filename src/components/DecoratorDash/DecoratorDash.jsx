import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import Widget from '../Widget/Widget';

const DecoratorDash = () => {

    const { user, loading } = useAuth();

    const axiosSecure = useAxiosSecure();

    //tankstack for loading completed bookings
    const { isLoading, data: completedBookings = [] } = useQuery({
        queryKey: ['completedBookings', user.email, 'completed'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/decorator?decoratorEmail=${user.email}&status=completed`);
            return res.data;
        }
    })

    const { isLoading: runnignLoading, data: assignedBookings = [] } = useQuery({
        queryKey: ['assignedBookings', user.email, 'assigned'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/decorator?decoratorEmail=${user.email}&status=assigned`);
            return res.data;
        }
    })
    
    const totalEarning = completedBookings.reduce(
        (sum, booking) => sum + Number(booking.servicePrice || 0),
        0
    );

    const totalProjects = completedBookings.length;

    // console.log(runnignProject)

    if (loading || isLoading || runnignLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='bg-white rounded-xl shadow-xl flex flex-col gap-3'>

            <h1 className='text-xl text-secondary font-bold p-5 border-b border-[#ffe3c2]'>Decorator Profile Overview</h1>

            <div className='p-5 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5'>
                <Widget title={'Total Completed Projects'} data={totalProjects} color={'orange'}></Widget>
                <Widget title={'Total Earnings'} data={totalEarning} color={'blue'}></Widget>
                <Widget title={'Current Project'} data={ assignedBookings.length > 0? assignedBookings[0]?.serviceName: 'No running project'} color={'violet'}></Widget>
            </div>

        </div>
    );
};

export default DecoratorDash;