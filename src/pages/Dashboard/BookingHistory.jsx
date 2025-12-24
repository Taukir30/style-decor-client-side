import Loading from '../../components/Loading/Loading';
import MyContainer from '../../components/MyContainer/MyContainer';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';
import { Link } from 'react-router';

const BookingHistory = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState("createdAt");
    const [order, setOrder] = useState("desc");

    const limit = 5;

    const axiosSecure = useAxiosSecure();

    //tankstack for loading all bookings
    const { isLoading, data: allBookingsData = {}, refetch: bookingRefetch } = useQuery({
        queryKey: ['allBookings', currentPage, sort, order],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allbookings?limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}`);
            return res.data;
        }
    })

    const dataCount = allBookingsData?.total ?? 0;

    const totalPages = Math.ceil(dataCount / limit);

    const allBookings = allBookingsData.result
    console.log(totalPages)

    const handleSelect = e => {
        const sortText = e.target.value;
        // console.log(sortText);
        setSort(sortText.split("-")[0]);
        setOrder(sortText.split("-")[1]);
        console.log(sort, order)
    }

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


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>Booking History</h1>

                    <div className='flex justify-between items-center'>
                        <Link to='/dashboard/assign-decorator' className="btn btn-outline btn-secondary w-40 md:w-45 text-secondary text-xs md:text-sm rounded-4xl h-[35px] hover:text-[#FBBA72]">Unassigned List</Link>

                        <select onChange={handleSelect} defaultValue="Pick a color" className="select rounded-4xl border border-secondary w-40 md:w-55">
                            <option disabled={true}>Sort</option>
                            <option value={"createdAt-desc"}>Date : High - Low</option>
                            <option value={"createdAt-asc"}>Date : Low - High</option>
                            <option value={"status-asc"}>Status : Low - High</option>
                            <option value={"status-desc"}>Status : Low - High</option>
                        </select>
                    </div>

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
                                    <th>Status</th>

                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    allBookings.map((booking, index) => <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f3f4f6' : 'transparent' }}>
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
                                            <span className={`overflow-hidden ${booking.status === 'completed' ? 'text-green-700' : 'text-orange-700'} px-3 py-2 rounded-2xl`}>
                                                {booking.status}
                                            </span>
                                        </td>


                                        <td>
                                            <div className='flex gap-1'>
                                                <button onClick={() => handleDelete(booking._id, booking.status)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text-xs p-2 h-8'>Delete</button>
                                            </div>

                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                        <div className='flex justify-center flex-wrap py-5 gap-1'>
                            {
                                currentPage > 0 && <button onClick={() => setCurrentPage(currentPage - 1)} className='btn'>Prev</button>
                            }
                            {
                                [...Array(totalPages).keys()].map((i) => (
                                    <button onClick={() => setCurrentPage(i)} className={`btn ${i === currentPage && 'btn-primary'}`}>{i}</button>
                                ))
                            }
                            {
                                currentPage < totalPages - 1 && <button onClick={() => setCurrentPage(currentPage + 1)} className='btn'>Next</button>
                            }
                        </div>
                    </div>
                </div>
            </MyContainer>
        </div>
    );
};

export default BookingHistory;