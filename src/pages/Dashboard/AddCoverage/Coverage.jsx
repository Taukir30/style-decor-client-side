import React from 'react';
import MyContainer from '../../../components/MyContainer/MyContainer';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';

const Coverage = () => {


    const axios = useAxios();

    const { isLoading, data: coverageAreas = [] } = useQuery({
        queryKey: ['coverageAreas'],
        queryFn: async () => {
            const res = await axios.get('/coverage');
            return res.data;
        }
    })

    console.log(coverageAreas)

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-5'>
            <MyContainer>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl text-secondary'>Coverage Areas</h1>
                    <Link to='/dashboard/add-coverage' className="btn btn-outline btn-secondary w-45 text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]">Add Coverage Area</Link>

                    {
                        coverageAreas.map((area, key) => <div className="overflow-x-auto shadow rounded-box border border-base-content/5 bg-base-100">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>District</th>
                                        <th>latitude</th>
                                        <th>longitude</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>{key+1}</th>
                                        <td>{area.districtName}</td>
                                        <td>{area.latitude}</td>
                                        <td>{area.longitude}</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>)
                    }

                </div>
            </MyContainer>
        </div>
    );
};

export default Coverage;