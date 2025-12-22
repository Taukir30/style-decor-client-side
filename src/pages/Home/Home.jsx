import React from 'react';
import Hero from '../../components/Hero/Hero';
import PopularServices from '../../components/PopularServices/PopularServices';
import CoverageMap from '../../components/CoverageMap/CoverageMap';
import TopDecorators from '../../components/TopDecorators/TopDecorators';


const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <PopularServices></PopularServices>
            <TopDecorators></TopDecorators>
            <CoverageMap></CoverageMap>
        </div>
    );
};

export default Home;