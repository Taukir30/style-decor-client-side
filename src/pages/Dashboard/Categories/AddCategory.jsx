import React from 'react';
import { Link } from 'react-router';
import MyContainer from '../../../components/MyContainer/MyContainer';
import useAxios from '../../../hooks/useAxios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddCategory = () => {

    const axios = useAxios();

    const { register, handleSubmit, reset } = useForm();

    const handleAddCategory = (data) => {

        const finalData = { ...data, createdAt: new Date().toISOString() };

        console.log(finalData);

        axios.post('/addcategory', finalData)
            .then(res => {
                console.log('after saving category', res.data);
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Category added!",
                    showConfirmButton: false,
                    timer: 2500
                });
            })

    }

    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>Add Category</h1>
                    <Link to='/dashboard/all-category' className="btn btn-outline btn-secondary w-50 text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]">Category List</Link>


                    <form onSubmit={handleSubmit(handleAddCategory)}>

                        <div className='flex flex-col md:flex-row my-5 gap-5'>

                            <div className='w-full md:w-1/2'>

                                <fieldset className="fieldset">
                                    {/* district name */}
                                    <label className="label mt-3 font-bold text-secondary">Category Name</label>
                                    <input type="text" {...register('categoryName')} required className="input w-full rounded-4xl" placeholder="District Name" />

                                </fieldset>
                            </div>

                        </div>

                        <button className='btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]'>Add Category</button>
                    </form>

                </div>
            </MyContainer>
        </div>
    );
};

export default AddCategory;