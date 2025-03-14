import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import homeBanner2 from "../assets/2.png";
import homeBanner1 from "../assets/1.png";
import homeBanner3 from "../assets/banner-3.jpg";

const Banner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="max-w-screen-2xl md:mt-8 lg:mt-10 mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
      <Swiper
        className="h-[300px] md:h-[650px] rounded-xl overflow-hidden shadow-xl"
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        loop={true}
      >
        {[homeBanner1, homeBanner2, homeBanner3].map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img 
                src={banner} 
                className="w-full h-full object-cover"
                alt={`Banner ${index + 1}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons with refs */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 z-10 flex justify-between md:left-8 md:right-8">
          <button 
            ref={prevRef}
            className="btn btn-circle shadow-lg bg-black/30 hover:bg-black/50 border-none text-white text-2xl w-12 h-12 md:w-16 md:h-16 transition-all duration-300"
          >
            ❮
          </button>
          <button 
            ref={nextRef}
            className="btn btn-circle shadow-lg bg-black/30 hover:bg-black/50 border-none text-white text-2xl w-12 h-12 md:w-16 md:h-16 transition-all duration-300"
          >
            ❯
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;