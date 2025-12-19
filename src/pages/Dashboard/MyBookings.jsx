import React, { useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import MyContainer from '../../components/MyContainer/MyContainer';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxios from '../../hooks/useAxios';

const MyBookings = () => {

    const [selectedBooking, setSelectedBooking] = useState(null);

    const { user } = useAuth();

    const modalRef = useRef(null);

    const { register, handleSubmit, setValue } = useForm();

    const axiosSecure = useAxiosSecure();
    const axios = useAxios();

    //loading all booking data
    const { isLoading, data: myBookings = [], refetch } = useQuery({
        queryKey: ['mybookings', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allbookings?email=${user.email}`);
            return res.data;
        }
    })

    console.log(myBookings)

    //cancelling function
    const handleDelete = (id, status) => {

        console.log(status)
        if (status !== 'pending' && status !== 'planning phase') {
            Swal.fire({
                icon: "error",
                title: "Can not cancel at this stage !",
                text: "you can cancel only in planning stage or before",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            return;
        }

        Swal.fire({                                                 //alert for confirmation
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/deletebooking/${id}`)      //calling delete api with axios
                    .then(res => {
                        console.log(res.data)

                        if (res.data.deletedCount) {

                            refetch();                          //refreshing data loading using tankstack

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your booking has been cancelled.",
                                icon: "success"
                            });
                        }
                    });

            }
        });
    }

    //tanstack for loading location
    const { data: coverageAreas = [] } = useQuery({
        queryKey: ['coverageAreas'],
        queryFn: async () => {
            const res = await axios.get('/coverage');
            return res.data;
        }
    })

    const locations = coverageAreas.map(c => c.districtName);                    //taking only the region property from the whole object


    //modal function
    const openEditModal = (booking) => {
        setSelectedBooking(booking);
        // console.log(booking)
        modalRef.current.showModal();
    }

    //tanckstack for selected booking
    const { isLoading: selectedLoading, data: booking = [] } = useQuery({
        queryKey: ['booking', selectedBooking?._id],
        enabled: !!selectedBooking?._id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/${selectedBooking._id}`);
            return res.data;
        }
    })

    console.log(booking)

    //setting default data in modal form
    useEffect(() => {
        if (booking) {
            setValue('address', booking.address);
            setValue('location', booking.location);
            setValue('area', booking.area);

            // You can even handle the date here like we discussed before
            setValue('scheduleDate', booking.scheduleDate);
        }
    }, [booking, setValue]);


    //updatting function
    const handleUpdate = data => {

        let price = 0;

        const area = parseInt(data.area);
        // const finalData = { ...data, created_at: new Date().toISOString(), serviceId: serviceDetails._id, status: 'pending' };


        if (booking.unit === 'sqr-ft') {
            price = area * booking.pricePerUnit;
        } else {
            price = booking.pricePerUnit;
        }

        const updateData = {

            location: data.location,
            address: data.address,
            servicePrice: price,
            serviceId: booking.serviceId,
            scheduleDate: data.scheduleDate,
            unit: booking.unit,
            pricePerUnit: booking.pricePerUnit
        }

        if (booking.unit === 'sqr-ft') {
            updateData.area = area;
        }

        console.log(updateData)

        axios.patch(`/booking/${booking._id}/update`, updateData)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    modalRef.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Booking updated!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>My Bookings</h1>


                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100">
                        <table className="table text-xs md:text-base">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Service Name</th>
                                    <th>Cost</th>
                                    <th className='hidden md:table-cell'>Location</th>
                                    <th className='hidden md:table-cell'>Date</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    myBookings.map((booking, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{booking.serviceName}</td>
                                        <td>{booking.servicePrice}</td>
                                        <td className='hidden md:table-cell'>{booking.location}</td>
                                        <td className='hidden md:table-cell'>{booking.scheduleDate}</td>
                                        <td>
                                            <span className={`overflow-hidden ${booking.status === 'completed' ? 'text-green-700' : 'text-orange-700'} px-3 py-2 rounded-2xl`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            {
                                                booking.paymentStatus === 'paid' ?
                                                    <span className='text-green-500 '>Paid</span> :
                                                    <Link to={`/dashboard/payment/${booking._id}`} className='btn btn-success text-green-950 rounded-4xl h-6'>Pay</Link>
                                            }
                                        </td>
                                        <td>
                                            <div className='flex gap-1'>
                                                <button onClick={() => openEditModal(booking)} className='btn btn-outline border-green-500 text-green-500 rounded-4xl text'>Edit</button>
                                                <button onClick={() => handleDelete(booking._id, booking.status)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text'>Cancel</button>
                                            </div>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

                {/* modal */}
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
                <dialog id="my_modal_5" ref={modalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box rounded-2xl bg-[#ffefdc]">
                        <h3 className="font-bold text-lg text-secondary">Update booking data</h3>

                        {/* <span className={`loading loading-bars loading-xl ${selectedLoading? 'block' : 'hidden'} `}></span> */}

                        <form onSubmit={handleSubmit(handleUpdate)} className='w-full'>
                            <fieldset className="fieldset">
                                {/* name */}
                                <label className="label text-secondary">Name</label>
                                <input type="text" className="input w-full rounded-4xl" value={booking?.name} readOnly />
                                {/* email */}
                                <label className="label text-secondary">Email</label>
                                <input type="email" className="input w-full rounded-4xl" value={booking?.email} readOnly />


                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-secondary">Location</legend>
                                    <select {...register('location')} defaultValue={booking.location} className="select w-full rounded-4xl">

                                        <option disabled={true} value={"Pick a Region"}>Pick a region</option>
                                        {
                                            locations.map((r, k) => <option key={k} value={r} >{r}</option>)
                                        }

                                    </select>
                                </fieldset>

                                {/* Address */}
                                <label className="label text-secondary">Address</label>
                                <input type="text" {...register('address')} defaultValue={booking?.address} className="input w-full rounded-4xl" />

                                {/*Service name */}
                                <label className="label text-secondary">Service Name</label>
                                <input type="text" className="input w-full rounded-4xl" value={booking?.serviceName} readOnly />

                                {
                                    booking.unit === 'sqr-ft' &&
                                    <div className=''>
                                        <label className="label text-secondary">Area in sqr-ft</label>
                                        <input type="text" {...register('area')} defaultValue={booking?.area} className="input w-full rounded-4xl" />
                                    </div>
                                }

                                {/*schedule */}
                                <label className="label text-secondary">Date</label>
                                <input type="date" {...register('scheduleDate')} className="input w-full rounded-4xl" />

                                <button className="btn btn-primary text-base text-secondary font-bold shadow-none rounded-4xl w-full mt-3">Confirm Booking</button>
                            </fieldset>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="flex btn btn-outline btn-secondary rounded-4xl h-[35px]">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </MyContainer>
        </div>
    );
};

export default MyBookings;