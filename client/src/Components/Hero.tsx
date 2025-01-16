import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='bgred-300 h-[34rem] flex items-center flex-col justify-center'>
      <div className="text flex flex-col items-center justify-center bg-gren-400 px-4 py-8 rounded-lg space-y-5">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Streamline Your <span className='g-blueColor px-2 py-1 rotate-6  text-blueColor'>Tasks</span>, Achieve More
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-textColor px-12">
        Strivio is designed to help you streamline your workflow and boost your productivity. 
        Whether you're managing personal tasks or collaborating with a team, our intuitive tools 
        make it easy to stay organized and focused. Join thousands of users who have transformed 
        their productivity with Strivio.
    </p>
        <Link to="/auth/register"><Button className='bg-accent text-primary font-semibold hover:bg-blueColor transition duration-200'>Join Now</Button></Link>
      </div>

      
      

    </div>
  )
}

export default Hero