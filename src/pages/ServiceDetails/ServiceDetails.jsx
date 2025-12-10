import React, { useRef } from 'react';
import MyContainer from '../../components/MyContainer/MyContainer';
import Loading from '../../components/Loading/Loading';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { FcMoneyTransfer } from "react-icons/fc";
import { FcRating } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const ServiceDetails = () => {

    const { user } = useAuth();

    const modalRef = useRef(null);

    const { id } = useParams();

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const axios = useAxios()
    const axiosSecure = useAxiosSecure();

    //tanstack for loading service deatails
    const { isLoading, data: serviceDetails } = useQuery({
        queryKey: ['serviceDetails', id],
        queryFn: async () => {
            const res = await axios.get(`/service/${id}`);
            return res.data;
        }
    })

    //tanstack for loading location
    const { data: coverageAreas = [] } = useQuery({
        queryKey: ['coverageAreas'],
        queryFn: async () => {
            const res = await axios.get('/coverage');
            return res.data;
        }
    })

    const locations = coverageAreas.map(c => c.districtName);                    //taking only the region property from the whole object

    // console.log(locations)

    //modal function
    const handleBidModal = () => {
        modalRef.current.showModal();
    }

    //add booking fuction
    const handleBooking = (data) => {

        const finalData = { ...data, created_at: new Date().toISOString(), serviceId: serviceDetails._id, status: 'pending' };

        console.log(finalData);

        axiosSecure.post('/addbooking', finalData)
            .then(res => {
                console.log('after booking', res.data);

                modalRef.current.close();

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Booking Confirmed successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch( error => console.log(error) );
    }


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
                                <span className='mr-2 text-secondary'>Price:</span>
                                <span className="text-gray-600">{serviceDetails.price}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FcClock />
                                <span className='mr-2 text-secondary'>Installation time:</span>
                                <span className="text-gray-600">{serviceDetails.duration}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FcRating />
                                <span className='mr-2 text-secondary'>Ratings:</span>
                                <span className="text-gray-600">
                                    {serviceDetails.rating}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <p href="#" className="text-blue-500 font-semibold hover:underline">
                                    12 team members
                                </p>
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

                        <button onClick={handleBidModal} className='flex btn btn-outline btn-secondary text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]'>Book Now</button>
                    </div>
                </div>
            </div>

            {/* modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <dialog id="my_modal_5" ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-2xl bg-[#ffefdc]">
                    <h3 className="font-bold text-lg text-secondary">Offer the best the price to seller!</h3>

                    <form onSubmit={handleSubmit(handleBooking)} className='w-full'>
                        <fieldset className="fieldset">
                            {/* name */}
                            <label className="label text-secondary">Name</label>
                            <input type="text" {...register('name')} className="input w-full rounded-4xl" defaultValue={user?.displayName} readOnly />
                            {/* email */}
                            <label className="label text-secondary">Email</label>
                            <input type="email" {...register('email')} className="input w-full rounded-4xl" defaultValue={user?.email} readOnly />

                            {/* contact */}
                            <label className="label text-secondary">Contact</label>
                            <input type="text" {...register('contact')} className="input w-full rounded-4xl" />

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-secondary">Location</legend>
                                <select {...register('location')} defaultValue="Pick a Region" className="select w-full rounded-4xl">

                                    <option disabled={true} value={"Pick a Region"}>Pick a region</option>
                                    {
                                        locations.map((r, k) => <option key={k} value={r} >{r}</option>)
                                    }

                                </select>
                            </fieldset>

                            {/* Address */}
                            <label className="label text-secondary">Address</label>
                            <input type="text" {...register('address')} className="input w-full rounded-4xl" />

                            {/*Service name */}
                            <label className="label text-secondary">Service Name</label>
                            <input type="text" {...register('serviceName')} className="input w-full rounded-4xl" defaultValue={serviceDetails?.name} readOnly />

                            {/*price */}
                            <label className="label text-secondary">Price</label>
                            <input type="text" {...register('servicePrice')} className="input w-full rounded-4xl" defaultValue={serviceDetails?.price} readOnly />

                            <button className="btn btn-primary text-base text-secondary font-bold shadow-none rounded-4xl w-full mt-3">Confirm Booking</button>
                        </fieldset>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="flex btn btn-outline btn-secondary text-secondary rounded-4xl h-[35px]">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </MyContainer>

    );
};

export default ServiceDetails;