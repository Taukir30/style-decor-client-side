import React from 'react';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import MyContainer from '../../components/MyContainer/MyContainer';

const AssignedProjects = () => {

    // const [selectedBooking, setSelectedBooking] = useState(null);

    // const modalRef = useRef(null);

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    //tankstack for loading pending bookings
    const { isLoading, data: allAssignedBookings = [], refetch: bookingRefetch } = useQuery({
        queryKey: ['allAssignedBookings', user.email, 'allAssigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/decorator?decoratorEmail=${user.email}`);
            return res.data;
        }
    })

    console.log(user.email)


    //modal function
    const openAssignDecoratorModal = (booking) => {
        // setSelectedBooking(booking);
        // console.log(booking)
        modalRef.current.showModal();
    }
    // console.log(selectedBooking)

    //tanckstack for available decorators
    // const { isLoading: decoratorLoading, data: availableDecorators = [] } = useQuery({
    //     queryKey: ['decorators', selectedBooking?.location, 'avaiable'],
    //     enabled: !!selectedBooking?.location,
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/alldecorators?status=approved&location=${selectedBooking.location}&workStatus=available`);
    //         return res.data;
    //     }
    // })

    // const handleAssign = (decorator) => {
    //     const decoratorAssignInfo = {
    //         decoratorId: decorator._id,
    //         decoratorEmail: decorator.email,
    //         decoratorName: decorator.name,
    //         bookingId: selectedBooking._id
    //     }
    //     // console.log(decoratorAssignInfo)
    //     axiosSecure.patch(`/booking/${selectedBooking._id}`, decoratorAssignInfo)
    //         .then(res => {
    //             if (res.data.modifiedCount) {
    //                 modalRef.current.close();
    //                 bookingRefetch();
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: "Decorator has been assigned!",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //         })
    // }

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>My Assigned Projects</h1>


                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100">
                        <table className="table text-xs md:text-base">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Service Name</th>
                                    <th>Cost</th>
                                    <th className='hidden md:table-cell'>Location</th>
                                    <th className='hidden md:table-cell'>Date</th>
                                    <th>Status</th>

                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    allAssignedBookings.map((booking, index) => <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f3f4f6' : 'transparent' }}>
                                        <th>{index + 1}</th>
                                        <td>{booking.serviceName}</td>
                                        <td>{booking.servicePrice}</td>
                                        <td className='hidden md:table-cell'>{booking.location}</td>
                                        <td className='hidden md:table-cell'>{booking.scheduleDate}</td>
                                        <td>
                                            <span className={`overflow-hidden capitalize ${booking.status === 'completed' ? 'text-green-700' : 'text-orange-700'} px-3 py-2 rounded-2xl`}>
                                                {booking.status}
                                            </span>
                                        </td>

                                        <td>
                                            <div className='flex gap-1 justify-center'>
                                                <button onClick={() => openAssignDecoratorModal(booking)} className='btn btn-outline border-green-700 text-green-700 rounded-4xl text'>View Details</button>
                                                
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
                {/* <dialog id="my_modal_5" ref={modalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box rounded-2xl bg-[#ffefdc]">
                        <h3 className="font-bold text-lg text-secondary">Available Decorators</h3>

                        <table className="table text-xs md:text-xs">
                            
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Experties</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="[&>tr:nth-child(n+2)]:bg-gray-100">
                                

                                {
                                    availableDecorators.map((decorator, index) => <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f3f4f6' : 'transparent' }}>
                                        <th>{index + 1}</th>
                                        <td>{decorator.name}</td>
                                        <td>{decorator.experties}</td>
                                        <td>
                                            <button onClick={() => handleAssign(decorator)} className='btn btn-outline h-6 border-green-700 text-green-700 rounded-4xl text'>Assign</button>

                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>

                        <div className="modal-action">
                            <form method="dialog">
                                
                                <button className="flex btn btn-outline btn-secondary rounded-4xl h-[35px]">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog> */}

            </MyContainer>
        </div>
    );
};

export default AssignedProjects;