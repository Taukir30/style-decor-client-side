import React from 'react';
import { Link } from 'react-router';

const ServiceCard = ({service}) => {
    
    console.log(service)

    return (
        <div>
            <div className="card rounded-sm bg-base-100 shadow-xl z-0">
                <div className=''>
                    <div className='w-full h-[250px] bg-cover rounded-t-sm p-1' style={{ backgroundImage: `url(${service.image})` }}>
                        {
                            service.isPopular && <div className="badge bg-secondary rounded-2xl text-xs text-white">Popular</div>
                        }
                    </div>
                </div>
                <div className="card-body flex flex-col items-center gap-3">
                    <h2 className="card-title text-center">{service.name}</h2>
                    <p className='text-center text-xs w-full h-[50px] overflow-hidden'>{service.description}</p>
                    <div className="card-actions justify-center mt-2">
                        <Link className="hidden md:flex btn btn-outline btn-secondary text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;