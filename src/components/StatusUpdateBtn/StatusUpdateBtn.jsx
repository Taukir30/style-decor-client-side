import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const StatusUpdateBtn = ({ booking, status, refetch }) => {

    const axiosSecure = useAxiosSecure()

    console.log(booking, status)

    const handleStatusUpdate = () => {
        const statusInfo = { 
            status: status,
            decoratorId: booking.decoratorId
        };
        axiosSecure.patch(`/booking/${booking._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Project status has been updated!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <button onClick={handleStatusUpdate} className='btn btn-outline border-green-700 text-green-700 rounded-4xl text'>Mark as {status}</button>
        </div>
    );
};

export default StatusUpdateBtn;