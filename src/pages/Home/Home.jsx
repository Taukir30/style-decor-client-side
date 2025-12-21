import React from 'react';
import Hero from '../../components/Hero/Hero';
import PopularServices from '../../components/PopularServices/PopularServices';
import CoverageMap from '../../components/CoverageMap/CoverageMap';
import TopDecorators from '../../components/TopDecorators/TopDecorators';
import Footer from '../../components/Footer/Footer';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <PopularServices></PopularServices>
            <TopDecorators></TopDecorators>
            <CoverageMap></CoverageMap>
            <Footer></Footer>
        </div>
    );
};

export default Home;