import { Link } from "react-router-dom";
import plgn from "../Images/Polygones.png";
import khat from "../Images/khat.png";

import { useEffect, useRef, useState } from "react";
import image1 from "../Images/img1.png"
import image2 from "../Images/img2.png"
import image3 from "../Images/img3.png" 
import WorkshopL from "../Components/WorkshopL";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const LandingUser = () => {

    
const swiperRef = useRef(null); 
const Workshops=
[
    {id:1},
    {id:2}

] 
  return (
    <div>
      <div id="Home" className="relative h-screen flex flex-row w-full px-8 ">
        <div className="w-[50%] pl-8">
          <img src={plgn} className="w-[100%] " alt="" />
        </div>

        <div className="p-12 flex flex-col items-center space-y-5 ">
          <h1 className=" font-bold text-[38px]"> Welcome to BeeFriendly! </h1>
          <p className=" text-center font-medium w-[90%] text-[25px]">
            By reporting a new hive, you're helping beekeepers to provide a
            safer and better home for bees.
          </p>

          <Link to="/Report" className="">
            <div className=" h-50 w-42 bg-asfar shadow-xl px-12 py-3 font-bold hover:shadow-2xl hover:scale-110  ">
              <p className="bg-asfar text-white "> Report a new hive </p>
            </div>
          </Link>
        </div>
        <img src={khat} className=" bottom-1/3 right-8 absolute z-0 " alt="" />
      </div>

      <div id="Description" className="w-[100%] flex flex-col gap-y-20">
        <div className="flex flex-row px-12 gap-x-9  justify-center items-start">
            <div className="flex flex-col gap-y-8">
                <h1 className="text-[50px] font-bold"> Bees and Beyond :
                  The Critical Role of Bees in Our Ecosystem </h1> 
                <p className="text-2xl"> BeeFriendly is dedicated to the fascinating world of bees. Bees are among the most important pollinators in the world, and they play a vital role in maintaining the balance of our ecosystem.Bees are among the most important pollinators in the world, and they play a vital role</p>
            </div>
          <div className=" border-dashed border-black border-[2px] h-[510px]">  </div>
            <img src={image1} className="w-1/2" alt="" />
        </div>

        <div className="flex flex-row px-12 gap-x-9 justify-center items-start">
        <img src={image3} className="w-1/2" alt="" />
          <div className=" border-dashed border-black border-[2px] h-[510px]">  </div>
          
            <div className="flex flex-col gap-y-8 ">
                <h1 className="text-[50px] font-bold"> Buzzing Crisis: How Threats to Bees Impact Our future </h1> 
                <p className="text-2xl"> Bees face several threats including habitat loss, pesticides, and climate change which have led to declines in bee populations, ultimately affecting our food system.</p>
            </div>
        </div>

        <div className="flex flex-row px-12 gap-x-9 justify-center items-start">
            <div className="flex flex-col gap-y-8">
                <h1 className="text-[50px] font-bold"> Hive Heroes: Report Hives and Help Save the Bees </h1> 
                <p className="text-2xl"> At BeeFriendly, we give beekeepers the opportunity to populate their colonies with bees that need a better and safer home, promoting the health and wellbeing of bees while helping beekeepers grow their business, promoting the health and wellbeing of bees while helping beekeepers grow their business</p>
            </div>
          <div className=" border-dashed border-black border-[2px] h-[510px]">  </div>
            <img src={image2} className="w-1/2" alt="" />
        </div>
      </div>

      <div id='workshops' className="pt-36 flex flex-col justify-center items-center ">
        <h1 className="text-[60px] font-bold"> Explore workshops </h1>
        <p className="text-2xl font-medium ">explore the infinite number of useful practical workshops that beekeeper offer . </p>

              <div>
                    
            <Swiper
              ref={swiperRef}
              spaceBetween={3}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                700: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              {Workshops.map((Ai, idx) => {
                return (
                    
                  <SwiperSlide key={idx}>
                    {({ isActive, isNext, isPrev }) => (
                      <div
                        className="scale-100 lg:scale-75  p-8 lg:p-1"
                      >
                       <Link to={`/Research/${Ai.announceCode}`}>
                          <WorkshopL Ai={Ai}></WorkshopL> 
                       </Link>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
              </div>
      </div>
    </div>
  );
};

export default LandingUser;
