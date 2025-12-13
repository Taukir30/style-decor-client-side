import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import MyContainer from '../../components/MyContainer/MyContainer';

const BeADecorator = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const axios = useAxios()

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    //tanstack for loading location
    const { isLoading, data: coverageAreas = [] } = useQuery({
        queryKey: ['coverageAreas'],
        queryFn: async () => {
            const res = await axios.get('/coverage');
            return res.data;
        }
    })

    const locations = coverageAreas.map(c => c.districtName);                    //taking only the region property from the whole object

    console.log(user)

    //add booking fuction
    const decoratorApply = (data) => {

        const finalData = { ...data, userId: user._id, photoURL: user.photoURL};

        console.log(finalData);

        axiosSecure.post('/decorators', finalData)
            .then(res => {
                console.log('after booking', res.data);


                if (res.data.insertedId) {
                    // navigate('/dashboard/my-bookings')
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Application successful, please wait for confirmation!",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
            .catch(error => console.log(error));
    }


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-5'>
            <MyContainer>
                <h2 className='text-center my-10 text-4xl text-secondary'>Be a Decorator</h2>

                <form onSubmit={handleSubmit(decoratorApply)} className='w-full'>
                    <div className='flex flex-col md:flex-row my-5 gap-5'>
                        {/* //left */}
                        <div className='w-full md:w-1/2'>
                            <h4 className='text-xl font-bold text-secondary mb-3'>Decorator Details</h4>

                            <fieldset className="fieldset">
                                {/* name */}
                                <label className="label text-secondary font-bold">Name</label>
                                <input type="text" {...register('name')} className="input w-full rounded-4xl" defaultValue={user?.displayName} readOnly />
                                {/* email */}
                                <label className="label text-secondary font-bold">Email</label>
                                <input type="email" {...register('email')} className="input w-full rounded-4xl" defaultValue={user?.email} readOnly />

                                {/* contact */}
                                <label className="label text-secondary font-bold">Contact</label>
                                <input type="text" {...register('contact')} className="input w-full rounded-4xl" placeholder='your contact number'/>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-secondary font-bold">Region</legend>
                                    <select {...register('location')} defaultValue="Pick a Region" className="select w-full rounded-4xl">

                                        <option disabled={true} value={"Pick a Region"}>Pick a region</option>
                                        {
                                            locations.map((r, k) => <option key={k} value={r} >{r}</option>)
                                        }

                                    </select>
                                </fieldset>

                                {/* Address */}
                                <label className="label text-secondary font-bold">Address</label>
                                <input type="text" {...register('address')} className="input w-full rounded-4xl" placeholder='your adress'/>


                            </fieldset>
                        </div>

                        {/* //right */}
                        <div className='w-full md:w-1/2'>
                            <h4 className='text-xl font-bold text-secondary mb-3'>Professional Details</h4>

                                <span className='text-secondary text-xs font-bold'>Photo</span>
                                <img src={user.photoURL} className='h-[90px] mb-7 rounded-2xl' alt="" />
                            <fieldset className="fieldset">
                                
                                {/*Experties */}
                                <label className="label text-secondary font-bold">Experties</label>
                                <input type="text" {...register('experties')} className="input w-full rounded-4xl" placeholder='field of experties'/>

                                {/*Experience */}
                                <label className="label text-secondary font-bold mt-1">Experience</label>
                                <input type="text" {...register('experience')} className="input w-full rounded-4xl" placeholder='experience in years'/>
                                
                                {/*NID */}
                                <label className="label text-secondary font-bold mt-1">NID</label>
                                <input type="text" {...register('nid')} className="input w-full rounded-4xl" placeholder='your NID number'/>


                            </fieldset>

                        </div>
                    </div>
                    <button className="btn btn-primary text-base text-secondary font-bold shadow-none rounded-4xl mt-3">Apply</button>
                </form>
            </MyContainer>
        </div>
    );
};

export default BeADecorator;