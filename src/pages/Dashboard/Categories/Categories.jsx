import React from 'react';
import Loading from '../../../components/Loading/Loading';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import MyContainer from '../../../components/MyContainer/MyContainer';
import { Link } from 'react-router';

const Categories = () => {

    const axiosSecure = useAxiosSecure();

    const { isLoading, data: allCategory = [], refetch } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allcategory`);
            return res.data;
        }
    })

    console.log(allCategory)

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

                axiosSecure.delete(`/category/${id}`)      //calling delete api with axios
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
                    <h1 className='text-2xl text-secondary'>Category List</h1>
                    <Link to='/dashboard/add-Category' className="btn btn-outline btn-secondary w-45 text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]">Add Category</Link>

                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100 my-3">
                        <table className="table text-xs md:text-base">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th className='hidden md:table-cell'>Register Date</th>
                                    
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    allCategory.map((Category, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            {Category.categoryName}
                                        </td>
                                        <td>{new Date(Category.createdAt).toLocaleDateString()}{" "}</td>
                                        <td>
                                            <button onClick={() => handleDelete(Category._id)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text'> Delete </button>
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

export default Categories;