import React from 'react';
import MyContainer from '../../components/MyContainer/MyContainer';
import DecoratorCard from '../../components/DecoratorCard/DecoratorCard';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';

const AboutUs = () => {

    const axios = useAxios();

    const { isLoading, data: alldecorators = [] } = useQuery({
        queryKey: ['alldecorators'],
        queryFn: async () => {
            const res = await axios.get('/alldecorators');
            return res.data;
        }
    })

    console.log(alldecorators)

    const topDecorators = alldecorators.slice(0, 4);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <MyContainer>
            <div className='my-5 flex flex-col gap-5 px-20'>
                <h1 className='text-center my-10 text-4xl text-secondary'>About Us</h1>
                <h2 className='text-2xl text-secondary text-left font-bold py-5'>Bringing Your Vision to Life with Smart, Seamless Decoration Planning</h2>

                <p className='text-base md:text-xl w-full '>At StyleDecor, we are redefining the way you experience home and event transformation. We understand that planning a celebration or refreshing your home’s look can often be overwhelmed by scheduling conflicts and logistical chaos. That’s why we built a modern platform that connects you directly with expert decorators for both in-studio consultations and comprehensive on-site services. From browsing exclusive packages to real-time project tracking—from the moment our team is assigned to the final setup—StyleDecor ensures a transparent, hassle-free journey. We combine creativity with technology to ensure that your only job is to enjoy the moment while we handle the details.</p>


            </div>

            <div className='pt-20 pb-25 px-20'>

                <h2 className='text-2xl text-secondary font-bold  my-10'>Our Team</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 z-0 '>
                    {
                        topDecorators.map(decorator => <DecoratorCard key={decorator._id} decorator={decorator} ></DecoratorCard>)
                    }
                </div>

            </div>
        </MyContainer>
    );
};

export default AboutUs;