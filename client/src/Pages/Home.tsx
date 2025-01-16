import React from 'react'
import AppWrap from '../utils/AppWrap'
import { Hero, Nav, Testimonial } from '../Components';
import { hero } from '../assets';

const Home = () => {
  return (
    <div className=''>
      {/* <div className="absolute top-0 z-[-3] h-full w-[55%] mx-auto  bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div> */}
        <Nav />
        {/* <div className='mesh-background'></div> */}
     <div id='home'>
        <Hero />
     </div>
     <img className='w-[50rem] mx-auto border-1 border-blue-600 rounded-md shadow-lg shadow-blue-300 sha' src={hero} alt="hero image" />
     <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
     <div className="absolute inset-0 top-[57rem] -z-20 h-full w-full bg-white transform rotate-180 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        <h1 className="text-4xl my-10 font-bold text-center bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text">About Us</h1>
     <div id="about">
        <div className="container mx-auto">
          <h2>Our Story</h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-textColor px-12">Strivio was born out of a simple need—to bridge the gap between planning and execution. Frustrated by complex tools and scattered workflows, our team set out to design a platform that simplifies task management without sacrificing powerful features. Today, Strivio helps teams worldwide stay organized, focused, and productive.</p>
        </div>
     </div>

     <div id="testimonial">
        <h1 className="text-4xl my-10 font-bold text-center bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text">Testimonial</h1>
        <h2 className='text-2xl text-gray-800 font-semibold text-center'>What our clients say?</h2>
        <Testimonial />
     </div>

    </div>
  )
}

const WrappedHome = () => (
  <AppWrap>
    <Home />
  </AppWrap>
);

export default WrappedHome;