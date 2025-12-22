import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import ServiceCardHolder from '../../components/ServiceCardHolder/ServiceCardHolder';
import { Link } from 'react-router';
import MyContainer from '../../components/MyContainer/MyContainer';
import useAuth from '../../hooks/useAuth';

const AllServices = () => {

    const {loading} = useAuth();

    const [searchText, setSearchText] = useState('');

    const axios = useAxios();

    const { data: allServices = [] } = useQuery({
        queryKey: ['allServices', searchText],
        queryFn: async () => {
            const res = await axios.get(`/allservices?searchText=${searchText}`);
            return res.data;
        }
    })

    //    console.log(popularServices)

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='mb-20 py-5 min-h-screen'>
            <MyContainer>
                <h2 className='text-center my-10 text-4xl text-secondary'>All Service Packages</h2>

                <div className='flex justify-between items-center px-0 md:px-20 xl:px-50 my-10'>
                    <Link to='/' className="btn btn-outline btn-secondary w-40 md:w-45 text-secondary text-xs md:text-sm rounded-4xl h-[35px] hover:text-[#FBBA72]">Home</Link>

                    <label className="input rounded-4xl border border-secondary w-40 md:w-55">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input onChange={(e) => setSearchText(e.target.value)} type="search" className="grow" placeholder="Search" />
                    </label>
                </div>

                <ServiceCardHolder services={allServices}></ServiceCardHolder>

                {/* <div className='flex justify-center my-5 py-5'>
                    <Link to='/allservices' className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]'>See All</Link>
                </div> */}
            </MyContainer>
        </div>
    );
};

export default AllServices;