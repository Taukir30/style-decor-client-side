import React from 'react';
import MyContainer from '../MyContainer/MyContainer';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazonImg from '../../assets/brands/amazon.png'
import casioImg from '../../assets/brands/casio.png'
import moonstarImg from '../../assets/brands/moonstar.png'
import randstadImg from '../../assets/brands/randstad.png'
import starImg from '../../assets/brands/star.png'
import starpeopleImg from '../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';


const brandLogos = [amazonImg, casioImg, moonstarImg, randstadImg, starImg, starpeopleImg, moonstarImg, randstadImg]

const Brands = () => {
    return (
        <div className='pb-10 sm:pb-15 mt-35 px-0 sm:px-12'>
            <MyContainer>
                <div className="text-center mb-12">

                    <h2 className='text-center my-10 text-4xl text-secondary'>Our Partner Brands</h2>

                </div>
                <Swiper
                    loop={true}
                    slidesPerView={5}
                    centeredSlides={true}
                    spaceBetween={30}
                    grabCursor={true}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >
                    {
                        brandLogos.map((logo, index) => <SwiperSlide key={index}><img className='w-35' src={logo} alt="logo" /></SwiperSlide>)
                    }


                </Swiper>
            </MyContainer>
        </div>
    );
};

export default Brands;