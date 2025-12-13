import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import MyContainer from '../../components/MyContainer/MyContainer';

const UsersManagement = () => {

    const axiosSecure = useAxiosSecure();

    const { isLoading, data: users = [], refetch } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    console.log(users)

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

                axiosSecure.delete(`/users/${id}`)      //calling delete api with axios
                    .then(res => {
                        console.log(res.data)

                        if (res.data.deletedCount) {

                            refetch();                          //refreshing data loading using tankstack

                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    });

            }
        });
    }

    const handleMakeAdmin = (user) => {
        const roleInfo = { role: 'admin' };
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();                          //refreshing data loading using tankstack

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Approved as admin!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })

    }

    const handleRemoveAdmin = (user) => {
        const roleInfo = { role: 'user' };
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();                          //refreshing data loading using tankstack

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Removed admin permission!",
                        showConfirmButton: false,
                        timer: 2000
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
                    <h1 className='text-2xl text-secondary'>Users List</h1>


                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100">
                        <table className="table text-xs md:text-base">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th className='hidden md:table-cell'>Email</th>
                                    <th className='hidden md:table-cell'>Registration Date</th>
                                    <th>Admin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    users.map((user, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>

                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={user.photoURL}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.displayName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.role}</td>
                                        <td className='hidden md:table-cell'>{user.email}</td>
                                        <td className='hidden md:table-cell'>{new Date(user.createdAt).toLocaleDateString()}{" "}</td>

                                        <td>
                                            {
                                                user.role !== 'admin' ?
                                                    <button onClick={() => handleMakeAdmin(user)} className='btn btn-success text-xs text-green-950 rounded-4xl '>Make Admin</button> :
                                                    <button onClick={() => handleRemoveAdmin(user)} className='btn btn-danger text-xs text-green-950 rounded-4xl '>Remove Admin</button>
                                            }
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(user._id)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text'>{user.status === 'pending' ? 'Reject' : 'Remove'}</button>
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

export default UsersManagement;