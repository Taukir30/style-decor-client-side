import React from 'react';
import MyContainer from '../../components/MyContainer/MyContainer';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/Loading/Loading';
import useRole from '../../hooks/useRole';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {

    const { user, loading, updateUserProfile } = useAuth();

    const { role, roleLoading } = useRole();

    const { register, handleSubmit } = useForm();

    const axiosSecure = useAxiosSecure();

    const { isLoading, data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        }
    })

    console.log(users)

    // console.log(user)

    const handleUpdate = (data) => {
        const userProfile = {};
        if (data.name) userProfile.displayName = data.name;
        // console.log(userProfile)

        if (user.displayName === data.name) {
            Swal.fire({
                icon: "error",
                title: "Nothing to update!",
                text: "Input name to update...",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            return
        }

        axiosSecure.patch(`/users?email=${user.email}`, userProfile)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Profile updated!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        updateUserProfile(userProfile)
            .then((res) => {
                console.log(res);
                // if (res.modifiedCount) {
                //     Swal.fire({
                //         position: "top-end",
                //         icon: "success",
                //         title: "Profile updated!",
                //         showConfirmButton: false,
                //         timer: 1500
                //     });
                // }
            })
            .catch(error => {
                console.log(error)
            });
    }

    if (loading || roleLoading || isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>My Profile</h1>

                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100">

                        <div className="max-w-6xl mx-auto  py-5">
                            <div className="mb-6 py-2 border-b border-[#ffe3c2]">
                                <h2 className="text-xl px-6 font-semibold text-secondary mb-4 md:mb-0">
                                    {users[0].displayName}
                                </h2>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-10 px-6">
                                <div className="w-full lg:w-1/3">
                                    <div className="h-[350px] border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center shadow-sm bg-cover bg-center" style={{ backgroundImage: `url(${users[0]?.photoURL})` }}>


                                    </div>
                                </div>
                                <div className="w-full lg:w-2/3">
                                    <form onSubmit={handleSubmit(handleUpdate)}>

                                        <div className='flex flex-col md:flex-row my-5 gap-5'>

                                            <div className='w-full md:w-1/2'>

                                                <fieldset className="fieldset">
                                                    {/* Service name */}
                                                    <label className="label mt-3 font-bold text-secondary">Name</label>
                                                    <input type="text" {...register('name')} required className="input w-full rounded-4xl" defaultValue={users[0].displayName} />

                                                    {/* Price */}
                                                    <label className="label mt-3 font-bold text-secondary">Email </label>
                                                    <input type="text" readOnly className="input w-full rounded-4xl" defaultValue={users[0].email} />

                                                    {/* Unit */}
                                                    <label className="label mt-3 font-bold text-secondary">Role</label>
                                                    <input type="text" readOnly className="input w-full rounded-4xl" defaultValue={role} />

                                                </fieldset>
                                            </div>

                                        </div>

                                        <button className='flex btn btn-outline btn-secondary text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]'>Update Profile</button>
                                    </form>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </MyContainer>
        </div>
    );
};

export default MyProfile;