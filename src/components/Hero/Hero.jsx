import React from 'react';
import heroImg from '../../assets/heroimg.jpg'
import MyContainer from '../MyContainer/MyContainer';
import banImg from '../../assets/ban1.jpg';
import { Link } from 'react-router';
import { motion } from "motion/react"

const Hero = () => {
    return (
        <div className="h-[660px] md:h-[630px] bg-cover bg-center"  style={{ backgroundImage: `linear-gradient(to top, rgba(255, 239, 220,0.7), rgba(255, 239, 220, 1)), url(${heroImg})`}}  >

            <MyContainer>
                <div className='h-[630px] flex flex-col-reverse md:flex-row justify-between items-center gap-5 px-2 md:px-20'>

                    <motion.div 
                        className="left w-full md:w-2/3 flex flex-col gap-8"
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <h1 className='text-2xl lg:text-6xl/20 text-secondary tracking-wider font-light'>Elevate Your Events,<br /> Elevate Your Lifestyle.</h1>
                        <p className='text-base lg:text-2xl/8 w-full md:w-2/3'>Experience seamless booking for breathtaking ceremony decorations and cutting-edge smart home solutions.</p>
                        <Link className='btn btn-primary text-base text-secondary font-bold shadow-none rounded-4xl w-60'>Book Decoration Service</Link>
                    </motion.div>

                    <motion.div 
                        className="right w-full md:w-1/3 flex justify-center"
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <img src={banImg} alt="" className='w-[200px] md:w-[450px] rounded-tl-[80px] rounded-br-[80px] mt-10 md:mt-15'/>
                    </motion.div>

                </div>
            </MyContainer>
        </div>
    );
};

export default Hero;