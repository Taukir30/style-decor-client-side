import React, { useRef, useState } from 'react';
import MyContainer from '../../components/MyContainer/MyContainer';
import { Link } from 'react-router';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AssignDecorator = () => {

    const [selectedBooking, setSelectedBooking] = useState(null);

    const modalRef = useRef(null);

    const axiosSecure = useAxiosSecure();

    //tankstack for loading pending bookings
    const { isLoading, data: allBookingsData = {}, refetch: bookingRefetch } = useQuery({
        queryKey: ['pendingBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allbookings?status=pending`);
            return res.data;
        }
    })

    const pendingBookings = allBookingsData.result

    // console.log(pendingBookings)

    //cancelling function
    const handleDelete = (id, status) => {

        // console.log(status)
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

                            bookingRefetch();                          //refreshing data loading using tankstack

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

    //modal function
    const openAssignDecoratorModal = (booking) => {
        setSelectedBooking(booking);
        console.log(booking)
        if (booking.paymentStatus === "unpaid") {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Custormer has not paid yet!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        modalRef.current.showModal();
    }
    // console.log(selectedBooking)

    //tanckstack for available decorators
    const { isLoading: decoratorLoading, data: availableDecorators = [] } = useQuery({
        queryKey: ['decorators', selectedBooking?.location, 'avaiable'],
        enabled: !!selectedBooking?.location,
        queryFn: async () => {
            const res = await axiosSecure.get(`/alldecorators?status=approved&location=${selectedBooking.location}&workStatus=available`);
            return res.data;
        }
    })

    const handleAssign = (decorator) => {
        const decoratorAssignInfo = {
            decoratorId: decorator._id,
            decoratorEmail: decorator.email,
            decoratorName: decorator.name,
            bookingId: selectedBooking._id
        }
        // console.log(decoratorAssignInfo)
        axiosSecure.patch(`/booking/${selectedBooking._id}`, decoratorAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    modalRef.current.close();
                    bookingRefetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Decorator has been assigned!",
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
                    <h1 className='text-2xl text-secondary'>Assign Decorator</h1>


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
                                    
                                    <th>Payment Status</th>

                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    pendingBookings.map((booking, index) => <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f3f4f6' : 'transparent' }}>
                                        <th>{index + 1}</th>
                                        <td>{booking.serviceName}</td>
                                        <td>{booking.servicePrice}</td>
                                        <td className='hidden md:table-cell'>{booking.location}</td>
                                        <td className='hidden md:table-cell'>{booking.scheduleDate}</td>
                                        <td>
                                            <span className={`overflow-hidden ${booking.paymentStatus === 'paid' ? 'text-green-700' : 'text-orange-700'} px-3 py-2 rounded-2xl`}>
                                                {booking.paymentStatus}
                                            </span>
                                        </td>
                                        

                                        <td>
                                            <div className='flex gap-1'>
                                                <button onClick={() => openAssignDecoratorModal(booking)} className='btn btn-outline border-green-700 text-green-700 rounded-4xl text-xs p-2 h-8'>Assign Decorator</button>
                                                <button onClick={() => handleDelete(booking._id, booking.status)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text-xs p-2 h-8'>Cancel</button>
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
                        <h3 className="font-bold text-lg text-secondary">Available Decorators</h3>

                        <table className="table text-xs md:text-xs">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Experties</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="[&>tr:nth-child(n+2)]:bg-gray-100">

                                {/* loading spinner */}
                                <tr className={` ${decoratorLoading === true ? 'table-row' : 'hidden'}`}> 
                                    <td className='col-span-4 text-center'>
                                        <Loading></Loading>
                                    </td>
                                </tr>

                                {/* row 1 */}

                                {
                                    availableDecorators.map((decorator, index) => <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f3f4f6' : 'transparent' }}>
                                        <th>{index + 1}</th>
                                        <td>{decorator.name}</td>
                                        <td>{decorator.experties}</td>
                                        <td>
                                            <button onClick={() => handleAssign(decorator)} className='btn btn-outline h-6 border-green-700 text-green-700 rounded-4xl text'>Assign</button>

                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>

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

export default AssignDecorator;