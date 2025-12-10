import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import MyContainer from '../../components/MyContainer/MyContainer';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyBookings = () => {

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { isLoading, data: myBookings = [], refetch } = useQuery({
        queryKey: ['mybookings', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allbookings?email=${user.email}`);
            return res.data;
        }
    })

    console.log(myBookings)

    //cancelling function
    const handleDelete = (id) => {
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
                    .then( res => {
                        console.log(res.data)

                        if(res.data.deletedCount){

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

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>My Bookings</h1>


                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Service Name</th>
                                    <th>Cost</th>
                                    <th>Location</th>
                                    <th>Status</th>
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
                                        <td>{booking.location}</td>
                                        <td>
                                            <span className={`badge ${booking.status === 'completed' ? 'badge-success' : 'badge-primary'} text-white px-3 py-2 rounded-2xl`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            {booking.status === 'pending' && <button onClick={()=>handleDelete(booking._id)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text'>Cancel</button>}
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

export default MyBookings;