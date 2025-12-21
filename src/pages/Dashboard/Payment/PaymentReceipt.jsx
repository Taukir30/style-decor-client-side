import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import MyContainer from '../../../components/MyContainer/MyContainer';
import Logo from '../../../components/Logo/Logo';
import { IoMdPrint } from 'react-icons/io';

const PaymentReceipt = () => {

    const { id } = useParams();

    const axiosSecure = useAxiosSecure();

    //tanstack for loading revenue
    const { isLoading, data: paymentData } = useQuery({
        queryKey: ['paymentData', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${id}/receipt`);
            return res.data;
        }
    })

    //tanstack for loading customer
    const { isLoading: bookingLoading, data: booking } = useQuery({
        queryKey: ['user', paymentData?.trackingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/details?trackingId=${paymentData.trackingId}`);
            return res.data;
        }
    })

    console.log(paymentData)
    console.log(booking)

    const dateOnly = paymentData?.paidAt.split('T')[0];
    const subtotal = Math.floor(paymentData?.amount / 1.15);
    const vat = subtotal * 1.5

    if (isLoading || bookingLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-5'>
            <MyContainer>
                {/* --- Action Bar --- */}
                <div className="bg-white rounded-lg shadow-sm bpaymentData bpaymentData-gray-200 mb-6 p-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="w-full md:w-auto">
                            <h5 className="text-lg font-semibold text-gray-700">Order No: {paymentData?._id}</h5>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                className="btn btn-secondary flex items-center px-3 py-1.5 text-sm rounded-4xl hover:bg-yellow-500 transition-colors"
                                onClick={() => window.print()}
                            >
                                <IoMdPrint /> Print
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Main Invoice Card --- */}
                <div className="bg-white rounded-lg shadow-lg bpaymentData bpaymentData-gray-200 overflow-hidden mb-6" id="printableArea">
                    <div className="p-8 md:p-10">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left mb-8">
                            <div className="mb-4 sm:mb-0">
                                <Logo></Logo>

                            </div>
                            <div className="text-right">
                                <h2 className="text-3xl font-bold text-gray-700">Payment Receipt</h2>
                            </div>
                        </div>

                        <hr className="bpaymentData-gray-200 my-6" />

                        {/* Info Section */}
                        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
                            {/* Customer Details */}
                            <div>
                                <h6 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">Invoice to</h6>
                                <h5 className="text-lg font-semibold text-gray-800 mb-2">{booking.name}</h5>
                                <p className="fs--1">
                                    {booking.address}
                                </p>
                                <div className="text-sm text-gray-600 mt-2">
                                    <a href="mailto:example@gmail.com" className="block hover:text-blue-600">{booking.email}</a>
                                    <a href="tel:444466667777" className="block hover:text-blue-600">{booking.contact}</a>
                                </div>
                            </div>

                            {/* Order Meta Data */}
                            <div className="md:text-right">
                                <table className="w-full md:ml-auto md:w-auto text-sm text-gray-600">
                                    <tbody>
                                        <tr>
                                            <th className="font-semibold pr-4 py-1 text-left md:text-right">Order No:</th>
                                            <td className="py-1 text-start">{paymentData?._id}</td>
                                        </tr>
                                        <tr>
                                            <th className="font-semibold pr-4 py-1 text-left md:text-right">Order Date:</th>
                                            <td className="py-1 text-start">{dateOnly}</td>
                                        </tr>
                                        <tr>
                                            <th className="font-semibold pr-4 py-1 text-left md:text-right">Transaction Id:</th>
                                            <td className="py-1 text-start">{paymentData.transactionId}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Product Table */}
                        <div className="overflow-x-auto mb-8">
                            <table className="w-full text-sm text-left">
                                <thead className="text-white bg-blue-600">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold rounded-tl-lg">Service</th>
                                        <th className="px-4 py-3 font-semibold text-center">Unit</th>
                                        
                                        <th className="px-4 py-3 font-semibold text-right rounded-tr-lg">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    
                                        
                                            <tr className="bg-gray-50">
                                                <td className="px-4 py-3 font-medium text-gray-800">{paymentData.serviceName}</td>
                                                <td className="px-4 py-3 text-center text-gray-600">{booking.unit}</td>
                                                <td className="px-4 py-3 text-right text-gray-600">{subtotal} (BDT)</td>
                                                
                                            </tr>
                                        
                                    
                                </tbody>
                            </table>
                        </div>

                        {/* Totals Section */}
                        <div className="flex justify-end">
                            <div className="w-full sm:w-1/2 md:w-1/3">
                                <table className="w-full text-sm">
                                    <tbody>
                                        <tr>
                                            <th className="text-gray-700 font-bold py-2 text-right pr-4">Subtotal:</th>
                                            <td className="text-gray-800 font-semibold py-2 text-right">{ subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-700 font-bold py-2 text-right pr-4">Tax 15%:</th>
                                            <td className="text-gray-800 font-semibold py-2 text-right">{ vat}</td>
                                        </tr>
                                        <tr className="bpaymentData-t bpaymentData-gray-300">
                                            <th className="text-gray-900 font-bold py-3 text-right pr-4 text-base">Total:</th>
                                            <td className="text-gray-900 font-bold py-3 text-right text-base">{ paymentData?.amount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 bpaymentData-t bpaymentData-gray-200">
                        <p className="text-xs text-gray-500 mb-0">
                            <strong className="text-gray-700">Notes:</strong> We really appreciate your business. Let us know if there's anything else we can do!
                        </p>
                    </div>
                </div>
            </MyContainer>
        </div>
    );
};

export default PaymentReceipt;