import React from 'react';
import MyContainer from '../../components/MyContainer/MyContainer';
import Loading from '../../components/Loading/Loading';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { FcMoneyTransfer } from "react-icons/fc";
import { FcRating } from "react-icons/fc";
import { FcClock } from "react-icons/fc";


const ServiceDetails = () => {

    const { id } = useParams();

    const axios = useAxios();

    const { isLoading, data: serviceDetails } = useQuery({
        queryKey: ['serviceDetails', id],
        queryFn: async () => {
            const res = await axios.get(`/service/${id}`);
            return res.data;
        }
    })

    console.log(serviceDetails)

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <MyContainer>
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-semibold text-secondary mb-4 md:mb-0">
                        Service Details
                    </h2>
                    <div className="flex gap-4 text-2xl text-gray-800">
                        {
                            serviceDetails.isPopular && <div className="badge bg-secondary rounded-2xl text-xs text-primary">Popular</div>
                        }
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-1/3">
                        <div className="h-[400px] border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center shadow-sm bg-cover bg-center" style={{ backgroundImage: `url(${serviceDetails.image})` }}>


                        </div>
                    </div>
                    <div className="w-full lg:w-2/3">
                        <div className="flex items-start gap-4 mb-6">
                            
                            <div>
                                <h4 className="font-bold text-xl tracking-wide uppercase mb-1 text-secondary">
                                    {serviceDetails.name}
                                </h4>
                                <p className="text-primary font-bold text-base flex  flex-col md:flex-row">
                                    <span className='mr-2 text-secondary'>Category:</span> {serviceDetails.category}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-800 leading-relaxed mb-4">
                            {serviceDetails.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 mt-4">
                            <div className="flex items-center gap-3">
                                <FcMoneyTransfer />
                                <span className="text-gray-600">{serviceDetails.price}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FcClock />
                                <span className="text-gray-600">{serviceDetails.duration}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FcRating />
                                <span className="text-gray-600">
                                    {serviceDetails.rating}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-user-group text-2xl text-gray-800" />
                                <a href="#" className="text-blue-500 font-semibold hover:underline">
                                    12 team members
                                </a>
                            </div>
                        </div>

                        <div className='my-5'>
                            <h3 className='text-base font-bold text-secondary'>Facilities:</h3>
                            <ul className='list-disc mx-10 text-sm text-primary'>
                                {
                                    serviceDetails.facilities.map((facility, index) => <li key={index}>{facility}</li>)
                                }
                            </ul>
                        </div>

                        <button className='flex btn btn-outline btn-secondary text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]'>Book Now</button>
                    </div>
                </div>
            </div>


        </MyContainer>

    );
};

export default ServiceDetails;