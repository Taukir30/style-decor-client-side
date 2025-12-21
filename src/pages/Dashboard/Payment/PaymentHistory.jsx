import React from 'react';
import MyContainer from '../../../components/MyContainer/MyContainer';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { isLoading, data: paymentRecords = [] } = useQuery({
        queryKey: ['paymentRecords', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })

    console.log(paymentRecords)

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>Payment History</h1>

                    <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Service</th>
                                    <th>Amount</th>
                                    <th>Paid at</th>
                                    <th>Transaction ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    paymentRecords.map((record, key) => <tr key={key}>
                                        <th>{key + 1}</th>
                                        <td>{record.serviceName}</td>
                                        <td>{record.amount}</td>
                                        <td>
                                            {new Date(record.paidAt).toLocaleDateString()}{" "}
                                            {new Date(record.paidAt).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </td>
                                        <td>{record.transactionId}</td>
                                        <td>
                                            <Link to={`/dashboard/payment-receipt/${record._id}`} className='btn btn-primary text-green-950 rounded-4xl text-xs p-2 h-8'>View Receipt</Link>
                                        </td>
                                    </tr>

                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </MyContainer>
        </div>
    );
};

export default PaymentHistory;