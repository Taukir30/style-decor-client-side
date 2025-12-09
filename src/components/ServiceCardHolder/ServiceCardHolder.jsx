import React from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';

const ServiceCardHolder = ({services}) => {

    console.log(services)

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 md:gap-x-10 xl:gap-x-20 gap-y-10 z-0 px-0 md:px-20 xl:px-50'>
            {
                services.map( service => <ServiceCard key={service._id} service={service} ></ServiceCard>)
            }        
        </div>
    );
};

export default ServiceCardHolder;