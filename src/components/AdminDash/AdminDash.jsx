import React from 'react';
import Widget from '../Widget/Widget';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../Loading/Loading';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const AdminDash = () => {

    const axiosSecure = useAxiosSecure();

    //tanstack for loading revenue
    const { isLoading: bookingRevenueLoading, data: bookingRevenueStats } = useQuery({
        queryKey: ['bookingRevenueStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings/revenue/total');
            return res.data;
        }
    })

    const operationalCost = bookingRevenueStats?.totalRevenue * 0.6;
    const totalProfit = bookingRevenueStats?.totalRevenue * 0.4;

    //tanstack for loading location
    const { isLoading: bookingStatLoading, data: bookingStatusStats = [] } = useQuery({
        queryKey: ['bookingStatusStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings/status/stats');
            return res.data;
        }
    })

    //tanstack for loading location
    const { isLoading, data: bookingDecoratorStats = [] } = useQuery({
        queryKey: ['bookingDecoratorStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings/service/stats');
            return res.data;
        }
    })

    console.log(bookingRevenueStats);

    const getHistogramData = data => {
        return data.map(item => {
            return { name: item.name, pv: item.count }
        })
    }

    // console.log(getHistogramData(bookingDecoratorStats))

    if (isLoading || bookingRevenueLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='bg-white rounded-xl shadow-xl flex flex-col gap-3'>

                <h1 className='text-xl text-secondary font-bold p-5 border-b border-base-200'>Revenue Analysis</h1>

                <div className='p-5 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5'>
                    <Widget title={'Total Revenue (BDT)'} data={bookingRevenueStats.totalRevenue} color={'orange'}></Widget>
                <Widget title={'Operational Cost (BDT)'} data={operationalCost} color={'blue'}></Widget>
                <Widget title={'Total Profit (BDT)'} data={totalProfit} color={'violet'}></Widget>
                </div>


            </div>

            <div className='bg-white rounded-xl shadow-xl flex flex-col gap-3'>

                <h1 className='text-xl text-secondary font-bold p-5 border-b border-base-200'>On Going Projects</h1>

                {
                    bookingStatLoading && <Loading></Loading>
                }

                <div className='p-5'>
                    <div className="stats w-full stats-vertical lg:stats-horizontal border border-base-200">
                        {
                            bookingStatusStats.map( (item, i) => <div key={i} className="stat">
                                <div className="stat-title text-primary text-base"> {item.name} </div>
                                <div className="stat-value"> {item.count} </div>
                                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                            </div>)
                        }
                    </div>
                </div>


            </div>

            <div className='bg-white rounded-xl shadow-xl flex flex-col gap-3'>
                <h2 className='text-xl text-secondary font-bold p-5 border-b border-base-200'>Service Demand Analysis</h2>

                <div className='p-8'>
                    <BarChart
                        style={{ width: '100%', maxWidth: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
                        responsive
                        data={getHistogramData(bookingDecoratorStats)}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis width="auto" allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" name="Service" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
                        {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} /> */}
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default AdminDash;