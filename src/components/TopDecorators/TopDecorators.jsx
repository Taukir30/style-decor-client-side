import React from 'react';
import MyContainer from '../MyContainer/MyContainer';
import Loading from '../Loading/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import ServiceCard from '../ServiceCard/ServiceCard';
import DecoratorCard from '../DecoratorCard/DecoratorCard';

const TopDecorators = () => {

    const axiosSecure = useAxiosSecure();

    const { isLoading, data: alldecorators = [] } = useQuery({
        queryKey: ['alldecorators'],
        queryFn: async () => {
            const res = await axiosSecure.get('/alldecorators');
            return res.data;
        }
    })

    console.log(alldecorators)

    const topDecorators = alldecorators.slice(0, 4);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='pt-20 pb-25 bg-white'>
            <MyContainer>
                <h2 className='text-center my-10 text-4xl text-secondary'>Top Decorators</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 z-0 px-0 md:px-20 xl:px-50'>
                    {
                        topDecorators.map(decorator => <DecoratorCard key={decorator._id} decorator={decorator} ></DecoratorCard>)
                    }
                </div>

                {/* <div className='flex justify-center my-5 py-5'>
                    <Link to='/allservices' className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]'>See All</Link>
                </div> */}
            </MyContainer>
        </div>
    );
};

export default TopDecorators;