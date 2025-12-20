import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';
import MyContainer from '../../../components/MyContainer/MyContainer';
import { Link } from 'react-router';

const Services = () => {

    const axiosSecure = useAxiosSecure();

    const { isLoading, data: allServices = [], refetch } = useQuery({
        queryKey: ['allServices'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allservices`);
            return res.data;
        }
    })

    console.log(allServices)

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

                                    <th>Action</th>
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
                                                <button onClick={() => handleEdit(service._id)} className='btn btn-outline border-green-700 text-green-700 rounded-4xl text'>Edit</button>
                                                <button onClick={() => handleDelete(service._id)} className='btn btn-outline border-red-500 text-red-500 rounded-4xl text'>Delete</button>
                                            </div>
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

export default Services;