import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import ServiceCardHolder from '../../components/ServiceCardHolder/ServiceCardHolder';
import { Link } from 'react-router';
import MyContainer from '../../components/MyContainer/MyContainer';

const AllServices = () => {

    const axios = useAxios();

    const { isLoading, data: allServices = [] } = useQuery({
        queryKey: ['allServices'],
        queryFn: async () => {
            const res = await axios.get('/allservices');
            return res.data;
        }
    })

    //    console.log(popularServices)

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-10'>
            <MyContainer>
                <h2 className='text-center my-10 text-4xl text-secondary'>Popular Services</h2>

                <ServiceCardHolder services={allServices}></ServiceCardHolder>

                {/* <div className='flex justify-center my-5 py-5'>
                    <Link to='/allservices' className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]'>See All</Link>
                </div> */}
            </MyContainer>
        </div>
    );
};

export default AllServices;