import React from 'react';
import Marquee from 'react-fast-marquee';
import image_1 from '../../assets/marquee-1.jpg';
import image_2 from '../../assets/marquee2.jpg';
import image_3 from '../../assets/marquee-3.png';
import image_4 from '../../assets/parquee-4.png';
import image_5 from '../../assets/marquee-5.png';

const StaticMarquee = () => {
    return (
        <div className="py-12 bg-gradient-to-b from-slate-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Trusted Partners
                </h2>
                
                <div className="relative group">
                    <Marquee 
                        speed={50}
                        gradient={false}
                        pauseOnHover
                    >
                        {[image_1, image_2, image_3, image_4, image_5].map((img, index) => (
                            <div 
                                key={index}
                                className="mx-8 transform transition-all duration-300 hover:scale-105"
                            >
                                <div className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100">
                                    <img 
                                        src={img} 
                                        alt={`Partner ${index + 1}`}
                                        className="h-20 w-48 object-contain grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </Marquee>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
                </div>

                <p className="text-center text-gray-600 mt-6 text-lg">
                    Collaborating with industry leaders worldwide
                </p>
            </div>
        </div>
    );
};

export default StaticMarquee;