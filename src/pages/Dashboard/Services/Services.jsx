import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';
import MyContainer from '../../../components/MyContainer/MyContainer';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAxios from '../../../hooks/useAxios';

const Services = () => {

    const [selectedService, setSelectedService] = useState(null);

    const modalRef = useRef(null);

    const { register, handleSubmit, setValue } = useForm();

    const axiosSecure = useAxiosSecure();
    const axios = useAxios();

    const { isLoading, data: allServices = [], refetch } = useQuery({
        queryKey: ['allServices'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allservices`);
            return res.data;
        }
    })

    console.log(allServices)


    //modal function
    const openEditModal = (service) => {
        setSelectedService(service);
        // console.log(service)
        modalRef.current.showModal();
    }

    //setting default data in modal form
    useEffect(() => {
        if (selectedService) {
            setValue('serviceName', selectedService.service_name);
            setValue('cost', selectedService.cost);
            setValue('unit', selectedService.unit);
            setValue('category', selectedService.service_category);
            setValue('description', selectedService.description);
            setValue('isPopular', selectedService.isPopular);
        }
    }, [selectedService, setValue]);

    //tanstack for loading categories
    const { data: allCategory = [] } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await axios.get('/allcategory');
            return res.data;
        }
    })

    const Categories = allCategory.map(c => c.categoryName);                    //taking only the name property from the whole object

    //updating service function
    const handleUpdateService = data => {

        const updateData = {

            service_name: data.serviceName,
            cost: data.cost,
            unit: data.unit,
            service_category: data.category,
            description: data.descripotion,
            isPopular: data.isPopular
        }

        console.log(updateData)

        axiosSecure.patch(`/services/${selectedService._id}`, updateData)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    modalRef.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Package has been updated!",
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

                axiosSecure.delete(`/services/${id}`)      //calling delete api with axios
                    .then(res => {
                        console.log(res.data)

                        if (res.data.deletedCount) {

                            refetch();                          //refreshing data loading using tankstack

                            Swal.fire({
                                title: "Deleted!",
                                text: "Service Package has been Deleted.",
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
                    <h1 className='text-2xl text-secondary'>Service Package Management</h1>
                    <Link to='/dashboard/add-service' className="btn btn-outline btn-secondary w-45 text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]">Add Service Package</Link>

                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100 my-3">
                        <table className="table text-xs md:text-base [&>tbody>tr:nth-child(even)]:bg-blue-50">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th className='hidden md:table-cell'>Unit</th>
                                    <th>Cost</th>
                                    <th className='hidden md:table-cell'>Category</th>
                                    <th className='hidden md:table-cell'>Applicaion Date</th>

                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    allServices.map((service, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={service.imageURL}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{service.service_name}</div>
                                                </div>
                                            </div>

                                        </td>
                                        <td className='hidden md:table-cell'>{service.unit}</td>
                                        <td>{service.cost}</td>
                                        <td className='hidden md:table-cell'>{service.service_category}</td>
                                        <td className='hidden md:table-cell'>{new Date(service.createdAt).toLocaleDateString()}{" "}</td>


                                        <td>
                                            <div className='flex gap-1'>
                                                <button onClick={() => openEditModal(service)} className='btn btn-outline border-green-700 text-green-700 rounded-4xl text-xs p-2 h-8'>Edit</button>
                                                <button onClick={() => handleDelete(service._id)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text-xs p-2 h-8'>Delete</button>
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
                        <h3 className="font-bold text-lg text-secondary">Update Service Package</h3>

                        {/* <span className={`loading loading-bars loading-xl ${selectedLoading? 'block' : 'hidden'} `}></span> */}

                        <form onSubmit={handleSubmit(handleUpdateService)}>

                            <div className='flex flex-col md:flex-row my-5 gap-5'>

                                <div className='w-full'>

                                    <fieldset className="fieldset">
                                        {/* photo */}
                                        <label className="label font-bold text-secondary">Photo</label>
                                        <img src={selectedService?.photoURL} className='h-[100px] my-3 rounded-xl' alt="" />

                                        {/* Service name */}
                                        <label className="label mt-3 font-bold text-secondary">Service Name</label>
                                        <input type="text" {...register('serviceName')} required className="input w-full rounded-4xl" placeholder="District Name" />

                                        {/* Price */}
                                        <label className="label mt-3 font-bold text-secondary">Cost per unit </label>
                                        <input type="text" {...register('cost')} required className="input w-full rounded-4xl" placeholder="Price" />

                                        {/* Unit */}
                                        <label className="label mt-3 font-bold text-secondary">Unit</label>
                                        <input type="text" {...register('unit')} required className="input w-full rounded-4xl" placeholder="Unit" />

                                        {/* category */}
                                        <fieldset className="fieldset">
                                            <legend className="fieldset-legend text-secondary">Category</legend>
                                            <select {...register('category')} className="select w-full rounded-4xl">

                                                <option disabled={true} value={"Pick a Region"}>Pick a Category</option>
                                                {
                                                    Categories.map((r, k) => <option key={k} value={r} >{r}</option>)
                                                }

                                            </select>
                                        </fieldset>

                                        {/* popular? */}
                                        <fieldset className="fieldset">
                                            <legend className="fieldset-legend text-secondary">Is Popular</legend>
                                            <select {...register('isPopular')} className="select w-full rounded-4xl">

                                                <option value='false'>Not Popular</option>
                                                <option value='true'>Popular</option>

                                            </select>
                                        </fieldset>

                                        {/* descripotion */}
                                        <label className="label mt-3 font-bold text-secondary">Descripotion</label>
                                        <textarea type="text" {...register('description')} required className="input w-full rounded-4xl h-15"  >
                                        </textarea>


                                    </fieldset>
                                </div>

                            </div>

                            <button className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]'>Update Package</button>
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

export default Services;