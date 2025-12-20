import React, { useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';
import MyContainer from '../../components/MyContainer/MyContainer';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAxios from '../../hooks/useAxios';

const AllDecorators = () => {

    const [selectedDecorator, setSelectedDecorator] = useState(null);

    const modalRef = useRef(null);

    const { register, handleSubmit, setValue } = useForm();

    const axiosSecure = useAxiosSecure();
    const axios = useAxios();

    const { isLoading, data: AllDecorators = [], refetch } = useQuery({
        queryKey: ['alldecorators'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/alldecorators`);
            return res.data;
        }
    })

    // console.log(selectedDecorator)

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
    const openEditModal = (decorator) => {
        setSelectedDecorator(decorator);
        // console.log(decorator)
        modalRef.current.showModal();
    }

    //setting default data in modal form
    useEffect(() => {
        if (selectedDecorator) {
            setValue('address', selectedDecorator.address);
            setValue('address', selectedDecorator.address);
            setValue('location', selectedDecorator.location);
            setValue('experties', selectedDecorator.experties);
            setValue('experience', selectedDecorator.experience);
        }
    }, [selectedDecorator, setValue]);


    //updatting function
    const handleUpdate = data => {

        const updateData = {

            location: data.location,
            address: data.address,
            experties: data.experties,
            experience: data.experience
        }

        // console.log(updateData)

        axiosSecure.patch(`/decorators/${selectedDecorator._id}`, updateData)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    modalRef.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Decorator has been updated!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }

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

    // approve decorator function
    const handleApproval = (decorator) => {
        console.log(decorator.email)
        const updateInfo = { status: 'approved', email: decorator.email };
        axiosSecure.patch(`/decorators/${decorator._id}/approval`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();                          //refreshing data loading using tankstack

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Decorator has been approved!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })

    }

    //disable function
    const handleDisable = (decorator) => {
        console.log(decorator.email)
        const updateInfo = { status: 'pending', workStatus: 'disabled', email: decorator.email };
        axiosSecure.patch(`/decorators/${decorator._id}/approval`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();                          //refreshing data loading using tankstack

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Decorator has been disabled!",
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
                    <h1 className='text-2xl text-secondary'>Decorators Management</h1>


                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100">
                        <table className="table text-xs md:text-base [&>tbody>tr:nth-child(even)]:bg-blue-50">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Experties</th>
                                    <th className='hidden md:table-cell'>Location</th>
                                    <th className='hidden md:table-cell'>Applicaion Date</th>
                                    <th>Work  Status</th>
                                    <th>Application Status</th>
                                    <th className='text-center'>Action</th>
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
                                                    <span className='text-orange-500 '>Pending</span> :
                                                    <span className='text-green-500 '>Approved</span>
                                            }
                                        </td>
                                        <td>
                                            <div className='flex gap-2'>
                                                {
                                                    decorator.status === 'pending' ?
                                                        <button onClick={() => handleApproval(decorator)} className='btn btn-success text-green-950 rounded-4xl text-xs p-2 h-8'>Approve</button> :
                                                        <button onClick={() => handleDisable(decorator)} className='btn btn-warning text-green-950 rounded-4xl text-xs p-2 h-8'>Disable</button>
                                                }
                                                <button onClick={() => openEditModal(decorator)} className='btn btn-outline text-violet-500 rounded-4xl text-xs p-2 h-8'>Edit</button>
                                                <button onClick={() => handleDelete(decorator._id)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text-xs p-2 h-8'>{decorator.status === 'pending' ? 'Reject' : 'Remove'}</button>
                                                {
                                                    // booking.status === 'pending' && <button onClick={()=>handleDelete(booking._id)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text'>Cancel</button>
                                                }
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
                        <h3 className="font-bold text-lg text-secondary">Update Decorator data</h3>

                        {/* <span className={`loading loading-bars loading-xl ${selectedLoading? 'block' : 'hidden'} `}></span> */}

                        <form onSubmit={handleSubmit(handleUpdate)} className='w-full'>
                            <fieldset className="fieldset">

                                {/* photo */}
                                <img src={selectedDecorator?.photoURL} className='h-[90px] my-3 rounded-xl' alt="" />

                                {/* name */}
                                <label className="label text-secondary">Name</label>
                                <input type="text" className="input w-full rounded-4xl" value={selectedDecorator?.name} readOnly />
                                {/* email */}
                                <label className="label text-secondary">Email</label>
                                <input type="email" className="input w-full rounded-4xl" value={selectedDecorator?.email} readOnly />


                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-secondary">Location</legend>
                                    <select {...register('location')} className="select w-full rounded-4xl">

                                        <option disabled={true} value={"Pick a Region"}>Pick a region</option>
                                        {
                                            locations.map((r, k) => <option key={k} value={r} >{r}</option>)
                                        }

                                    </select>
                                </fieldset>

                                {/* Address */}
                                <label className="label text-secondary">Address</label>
                                <input type="text" {...register('address')} defaultValue={selectedDecorator?.address} className="input w-full rounded-4xl" />

                                {/*Service name */}
                                <label className="label text-secondary">Experties</label>
                                <input type="text" {...register('experties')} className="input w-full rounded-4xl" />



                                {/*schedule */}
                                <label className="label text-secondary">Experience</label>
                                <input type="text" {...register('experience')} className="input w-full rounded-4xl" />

                                <button className="btn btn-primary text-base text-secondary font-bold shadow-none rounded-4xl w-full mt-3">Confirm Update</button>
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

export default AllDecorators;