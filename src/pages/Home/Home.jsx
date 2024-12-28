import React from 'react';
import Banner from '../../components/Banner';
import HotServices from './HotServices';
import HotReviews from './HotReviews';
import StaticMarquee from './StaticMarquee';

const Home = () => {
    return (
        <div className='my-3'>
            <Banner></Banner>
            <HotServices></HotServices>
            <div className='my-16'>
                <StaticMarquee></StaticMarquee>
            </div>
            <HotReviews></HotReviews>
        </div>
    );
};

export default Home;