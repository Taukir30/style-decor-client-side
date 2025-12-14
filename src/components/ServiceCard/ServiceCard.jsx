import React from 'react';
import { Link } from 'react-router';

const ServiceCard = ({service}) => {
    
    console.log(service)

    return (
        <div>
            <div className="card rounded-sm bg-base-100 shadow-xl z-0 h-115">
                <div className=''>
                    <div className='w-full h-[250px] bg-cover rounded-t-sm p-1' style={{ backgroundImage: `url(${service.imageURL})` }}>
                        {
                            service.isPopular && <div className="badge bg-secondary rounded-2xl text-xs text-white">Popular</div>
                        }
                    </div>
                </div>
                <div className="card-body flex flex-col items-center gap-3">
                    <h2 className="card-title text-center text-secondary h-13">{service.service_name}</h2>
                    <p className='text-center text-xs w-full h-[45px] overflow-hidden'>{service.description}</p>
                    <div className="card-actions justify-center mt-2">
                        <Link to={`/servicedetails/${service._id}`} className="flex btn btn-outline btn-secondary text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;