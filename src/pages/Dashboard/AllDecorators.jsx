import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';
import MyContainer from '../../components/MyContainer/MyContainer';
import { Link } from 'react-router';

const AllDecorators = () => {


    const axiosSecure = useAxiosSecure();

    const { isLoading, data: AllDecorators = [], refetch } = useQuery({
        queryKey: ['alldecorators'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/alldecorators`);
            return res.data;
        }
    })

    console.log(AllDecorators)

    //Deleting function
    const handleDelete = (id) => {

        // console.log(status)

        Swal.fire({                                                 //alert for confirmation
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/decorators/${id}`)      //calling delete api with axios
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

    const handleApproval = (decorator) => {
        console.log(decorator.email)
        const updateInfo = { status: 'approved', email: decorator.email };
        axiosSecure.patch(`/decorators/${decorator._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();                          //refreshing data loading using tankstack

                    Swal.fire({
                        title: "Approved!",
                        text: "Decorator has been approved!.",
                        icon: "success"
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
                    <h1 className='text-2xl text-secondary'>Decorators List</h1>


                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100">
                        <table className="table text-xs md:text-base">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Experties</th>
                                    <th className='hidden md:table-cell'>Location</th>
                                    <th className='hidden md:table-cell'>Applicaion Date</th>
                                    <th>Application Status</th>
                                    <th>Work Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    AllDecorators.map((decorator, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{decorator.name}</td>
                                        <td>{decorator.experties}</td>
                                        <td className='hidden md:table-cell'>{decorator.location}</td>
                                        <td className='hidden md:table-cell'>{new Date(decorator.createdAt).toLocaleDateString()}{" "}</td>
                                        <td>{decorator.workStatus}</td>

                                        <td>
                                            {
                                                decorator.status === 'pending' ?
                                                    <button onClick={() => handleApproval(decorator)} className='btn btn-success text-green-950 rounded-4xl h-6'>Approve</button> :
                                                    <span className='text-green-500 '>Approved</span>
                                            }
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(decorator._id)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text'>{decorator.status === 'pending' ? 'Reject' : 'Remove'}</button>
                                            {
                                                // booking.status === 'pending' && <button onClick={()=>handleDelete(booking._id)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text'>Cancel</button>
                                            }
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

export default AllDecorators;