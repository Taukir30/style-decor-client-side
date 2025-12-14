import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import MyContainer from '../../../components/MyContainer/MyContainer';
import { Link } from 'react-router';

const AddService = () => {

    const axios = useAxios();

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const handleAddCoverage = (data) => {

        const finalData = { ...data, created_at: new Date().toISOString() };

        console.log(finalData);

        axios.post('/addcoverage', finalData)
            .then(res => {
                console.log('after saving coverage', res.data);
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Coverage district added!",
                    showConfirmButton: false,
                    timer: 2500
                });
            })

    }

    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>Add Service Package</h1>
                    <Link to='/dashboard/coverage' className="btn btn-outline btn-secondary w-50 text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]">Service Packages List</Link>


                    <form onSubmit={handleSubmit(handleAddCoverage)}>

                        <div className='flex flex-col md:flex-row my-5 gap-5'>

                            <div className='w-full md:w-1/2'>

                                <fieldset className="fieldset">
                                    {/* district name */}
                                    <label className="label mt-3 font-bold text-secondary">Service Name</label>
                                    <input type="text" {...register('serviceName')} required className="input w-full rounded-4xl" placeholder="District Name" />

                                    {/* longitude */}
                                    <label className="label mt-3 font-bold text-secondary">Longitude </label>
                                    <input type="text" {...register('longitude')} required className="input w-full rounded-4xl" placeholder="Longitude" />

                                    {/* latitude */}
                                    <label className="label mt-3 font-bold text-secondary">Latitude</label>
                                    <input type="text" {...register('latitude')} required className="input w-full rounded-4xl" placeholder="Latitude" />

                                </fieldset>
                            </div>

                        </div>

                        <button className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]'>Add Area</button>
                    </form>

                </div>
            </MyContainer>
        </div>
    );
};

export default AddService;