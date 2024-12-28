import React from 'react';
import Marquee from 'react-fast-marquee';
import image_1 from '../../assets/marquee-1.jpg';
import image_2 from '../../assets/marquee2.jpg';
import image_3 from '../../assets/marquee-3.png';
import image_4 from '../../assets/parquee-4.png';
import image_5 from '../../assets/marquee-5.png';

const StaticMarquee = () => {
    return (
        <div className='space-x-10'>
            <h2 className="font-bold text-3xl text-center my-3">Our Partners</h2>
            <Marquee  >
                <div>
                    <img src={image_1} alt="" />
                </div>
                <div>
                    <img src={image_2} alt="" />
                </div>
                <div>
                    <img src={image_3} alt="" />
                </div>
                <div>
                    <img src={image_4} alt="" className='w-52' />
                </div>
                <div>
                    <img src={image_5} alt="" />
                </div>
            </Marquee>
        </div>
    );
};

export default StaticMarquee;