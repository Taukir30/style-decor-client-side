import React from 'react';
import MyContainer from '../../components/MyContainer/MyContainer';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const EarningSummery = () => {


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

    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>My Completed Projects</h1>


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
                                            <span className={`overflow-hidden capitalize ${booking.status === 'completed' ? 'text-green-700' : 'text-orange-700'} px-3 py-2 rounded-2xl`}>
                                                {booking.status}
                                            </span>
                                        </td>

                                        <td>
                                            <div className='flex gap-1 justify-center'>
                                                <button onClick={() => openAssignDecoratorModal(booking)} className='btn btn-outline border-green-700 text-green-700 rounded-4xl text'>View Details</button>
                                                {/* <button onClick={() => handleDelete(booking._id, booking.status)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text'>Cancel</button> */}
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

export default EarningSummery;