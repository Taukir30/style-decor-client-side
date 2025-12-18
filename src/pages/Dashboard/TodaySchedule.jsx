import React from 'react';
import Loading from '../../components/Loading/Loading';
import MyContainer from '../../components/MyContainer/MyContainer';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import StatusUpdateBtn from '../../components/StatusUpdateBtn/StatusUpdateBtn';

const TodaySchedule = () => {

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    //tankstack for loading pending bookings
    const { isLoading, data: assignedBookings = [], refetch } = useQuery({
        queryKey: ['assignedBookings', user.email, 'assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/decorator?decoratorEmail=${user.email}&status=assigned`);
            return res.data;
        }
    })

    console.log(user.email)

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

                            refetch()                          //refreshing data loading using tankstack

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


    // console.log(selectedBooking)

    //tanckstack for available decorators
    // const { isLoading: decoratorLoading, data: availableDecorators = [] } = useQuery({
    //     queryKey: ['decorators', selectedBooking?.location, 'avaiable'],
    //     enabled: !!selectedBooking?.location,
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/alldecorators?status=approved&location=${selectedBooking.location}&workStatus=available`);
    //         return res.data;
    //     }
    // })

    // const handleAssign = (decorator) => {
    //     const decoratorAssignInfo = {
    //         decoratorId: decorator._id,
    //         decoratorEmail: decorator.email,
    //         decoratorName: decorator.name,
    //         bookingId: selectedBooking._id
    //     }
    //     // console.log(decoratorAssignInfo)
    //     axiosSecure.patch(`/booking/${selectedBooking._id}`, decoratorAssignInfo)
    //         .then(res => {
    //             if (res.data.modifiedCount) {
    //                 modalRef.current.close();
    //                 bookingRefetch();
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: "Decorator has been assigned!",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //         })
    // }

    const handleStatusUpdate = (booking) => {
        const statusInfo = { status: 'planning phase' };
        axiosSecure.patch(`/booking/${booking._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Project status has been updated!`,
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
                    <h1 className='text-2xl text-secondary'>Today's Schedule</h1>


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

                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    assignedBookings.map((booking, index) => <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f3f4f6' : 'transparent' }}>
                                        <th>{index + 1}</th>
                                        <td>{booking.serviceName}</td>
                                        <td>{booking.servicePrice}</td>
                                        <td className='hidden md:table-cell'>{booking.location}</td>
                                        <td className='hidden md:table-cell'>{booking.scheduleDate}</td>
                                        <td>
                                            <span className={`overflow-hidden capitalize ${booking.status === 'completed' ? 'text-green-700' : 'text-orange-600'} px-3 py-2 rounded-2xl`}>
                                                {booking.status}
                                            </span>
                                        </td>

                                        <td>
                                            <div className='flex gap-1 justify-center'>

                                                {
                                                    booking?.status === 'assigned' ?
                                                        <StatusUpdateBtn booking={booking} status={'planning phase'} refetch={refetch} ></StatusUpdateBtn> :
                                                        // <button onClick={()=> handleStatusUpdate(booking)} className='btn btn-outline border-green-700 text-green-700 rounded-4xl text'>Mark as planning phase</button> :
                                                        booking?.status === 'planning phase' ?
                                                            <StatusUpdateBtn booking={booking} status={'materials prepared'} refetch={refetch} ></StatusUpdateBtn> :
                                                            booking?.status === 'materials prepared' ?
                                                                <StatusUpdateBtn booking={booking} status={'on the way to venue'} refetch={refetch} ></StatusUpdateBtn> :
                                                                booking?.status === 'on the way to venue' ?
                                                                    <StatusUpdateBtn booking={booking} status={'setup in progress'} refetch={refetch} ></StatusUpdateBtn> :
                                                                    booking?.status === 'setup in progress' ?
                                                                        <StatusUpdateBtn booking={booking} status={'completed'} refetch={refetch} ></StatusUpdateBtn> :
                                                                        'other btn'
                                                }

                                                <button onClick={() => handleDelete(booking._id, booking.status)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text'>Cancel</button>
                                            </div>

                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                </div>




            </MyContainer>
        </div>
    );
};

export default TodaySchedule;