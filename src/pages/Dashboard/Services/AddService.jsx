import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import MyContainer from '../../../components/MyContainer/MyContainer';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const AddService = () => {

    const {user} = useAuth();

    const axios = useAxios();

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    //tanstack for loading location
    const { data: allCategory = [] } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await axios.get('/allcategory');
            return res.data;
        }
    })

    const Categories = allCategory.map(c => c.categoryName);                    //taking only the name property from the whole object

    // console.log(locations)

    const handleAddCoverage = (data) => {

        const serviceImg = data.photo[0];                      //getting image from the form

        const formData = new FormData();                       //using formdata
        formData.append('image', serviceImg);                  //convert the image into formdata

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`;            //imgbb upload api

        axios.post(image_API_URL, formData)                             //uploading image using axios
            .then(res => {
                // console.log('after image upload', res.data.data.url);
                const photoURL = res.data.data.url;

                //create user in database
                const packageInfo = {
                    service_name: data.serviceName,
                    cost: data.cost,
                    unit: data.unit,
                    service_category: data.category,
                    description: data.descripotion,
                    imageURL: photoURL,
                    rating: 4.8,
                    isPopular: false,
                    photoURL: photoURL,
                    createdByEmail: user.email, 
                    created_at: new Date().toISOString()
                }

                console.log(packageInfo);

                axios.post('/addservice', packageInfo)
                    .then(res => {
                        console.log('after saving service package', res.data);
                        reset();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Service package added!",
                            showConfirmButton: false,
                            timer: 2500
                        });
                    })

            })

    }

    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>Add Service Package</h1>
                    <Link to='/dashboard/services-management' className="btn btn-outline btn-secondary w-50 text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]">Service Packages List</Link>


                    <form onSubmit={handleSubmit(handleAddCoverage)}>

                        <div className='flex flex-col md:flex-row my-5 gap-5'>

                            <div className='w-full md:w-1/2'>

                                <fieldset className="fieldset">
                                    {/* Service name */}
                                    <label className="label mt-3 font-bold text-secondary">Service Name</label>
                                    <input type="text" {...register('serviceName')} required className="input w-full rounded-4xl" placeholder="District Name" />

                                    {/* Price */}
                                    <label className="label mt-3 font-bold text-secondary">Cost per unit </label>
                                    <input type="text" {...register('cost')} required className="input w-full rounded-4xl" placeholder="Price" />

                                    {/* Unit */}
                                    <label className="label mt-3 font-bold text-secondary">Unit</label>
                                    <input type="text" {...register('unit')} required className="input w-full rounded-4xl" placeholder="Unit" />

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend text-secondary">Category</legend>
                                        <select {...register('category')} defaultValue="Pick a Region" className="select w-full rounded-4xl">

                                            <option disabled={true} value={"Pick a Region"}>Pick a Category</option>
                                            {
                                                Categories.map((r, k) => <option key={k} value={r} >{r}</option>)
                                            }

                                        </select>
                                    </fieldset>

                                    {/* descripotion */}
                                    <label className="label mt-3 font-bold text-secondary">Descripotion</label>
                                    <textarea type="text" {...register('descripotion')} required className="input w-full rounded-4xl h-15"  >
                                    </textarea>

                                    {/* photo */}
                                    <label className="label mt-3 font-bold text-secondary">Photo</label>
                                    <input type="file" {...register('photo', { required: true })} className="file-input w-full rounded-4xl" placeholder="Photo" />
                                    {
                                        errors.photo?.type === 'required' &&
                                        <p className='text-red-500'>Photo is required</p>
                                    }

                                </fieldset>
                            </div>

                        </div>

                        <button className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]'>Add Package</button>
                    </form>

                </div>
            </MyContainer>
        </div>
    );
};

export default AddService;