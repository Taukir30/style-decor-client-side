import React from 'react';
import MyContainer from '../MyContainer/MyContainer';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import {  useQuery } from '@tanstack/react-query'
import ServiceCardHolder from '../ServiceCardHolder/ServiceCardHolder';
import Loading from '../Loading/Loading';

const PopularServices = () => {

   const axios = useAxios();

   const { isLoading, data: popularServices = [] } =useQuery({
        queryKey: ['popularServices'],
        queryFn: async () => {
            const res = await axios.get('/popularservices');
            return res.data;
        }
   })

//    console.log(popularServices)

   if(isLoading){
        return <Loading></Loading>
   }

    return (
        <div className='my-20'>
            <MyContainer>
                <h2 className='text-center my-10 text-4xl text-secondary'>Popular Services</h2>
                
                <ServiceCardHolder services={popularServices}></ServiceCardHolder>

                <div className='flex justify-center my-5 py-5'>
                    <Link to='/allservices' className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]'>See All</Link>
                </div>
            </MyContainer>
        </div>
    );
};

export default PopularServices;