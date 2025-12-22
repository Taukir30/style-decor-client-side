import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import MyContainer from '../../components/MyContainer/MyContainer';
import useAuth from '../../hooks/useAuth';

const UsersManagement = () => {

    const {user} = useAuth();

    const axiosSecure = useAxiosSecure();

    const { isLoading, data: dbUsers = [], refetch } = useQuery({
        queryKey: ['alldbUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    console.log(dbUsers)

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

    //function to make admin
    const handleMakeAdmin = (user) => {

        Swal.fire({                                                 //alert for confirmation
            title: "Are you sure?",
            text: `Do you want to make ${user.displayName} admin !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {

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
        });



    }

    //function to remove admin
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
                    <h1 className='text-2xl text-secondary'>User Management</h1>


                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100">
                        <table className="table text-xs md:text-base [&>tbody>tr:nth-child(even)]:bg-blue-50">
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
                                    dbUsers.map((dbUser, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>

                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={dbUser.photoURL}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{dbUser.displayName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{dbUser.role}</td>
                                        <td className='hidden md:table-cell'>{dbUser.email}</td>
                                        <td className='hidden md:table-cell'>{new Date(dbUser.createdAt).toLocaleDateString()}{" "}</td>

                                        <td className='w-fit'>
                                            <div className='flex flex-col gap-1'>
                                                {
                                                    dbUser.role !== 'admin' ?
                                                        
                                                            <button onClick={() => handleMakeAdmin(dbUser)} className='btn btn-success text-green-950 rounded-4xl text-xs p-2 h-8'>Make Admin</button> 
                                                        :
                                                        <button onClick={() => handleRemoveAdmin(dbUser)} disabled={user.email === dbUser.email} className='btn btn-danger  text-xs p-2 h-8 text-green-950 rounded-4xl '>Remove Admin</button>
                                                }
                                                {
                                                    dbUser.role === 'user' &&
                                                    <button onClick={() => handleMakeAdmin(dbUser)} className='btn btn-primary text-green-950 rounded-4xl text-xs p-2 h-8'>Make Decorator</button> 
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(dbUser._id)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text-xs p-2 h-8'>{dbUser.status === 'pending' ? 'Reject' : 'Remove'}</button>
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