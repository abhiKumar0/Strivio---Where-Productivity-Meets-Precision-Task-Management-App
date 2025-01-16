import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='flex justify-between items-center px-4 py-2'>
        <div className="logo text-2xl font-bold text-blueColor">Strivio</div>
        <div className="items">
            <ul className='flex space-x-6 font-normal text-textColor '>
                <li><a className='hover:border-b hover:border-blueColor hover:text-blueColor transition duration-300 ' href="#home">Home</a></li>
                <li><a className='hover:border-b hover:border-blueColor hover:text-blueColor transition duration-300' href="#about">About</a></li>
                <li><a className='hover:border-b hover:border-blueColor hover:text-blueColor transition duration-300' href="#testimonial">Testimonials</a></li>
                <li><a className='hover:border-b hover:border-blueColor hover:text-blueColor transition duration-300' href="#contact">Contact</a></li>
            </ul>
        </div>
        <div className="join">
            <Link to="/auth/register"><Button className='bg-accent text-primary font-semibold hover:bg-blueColor transition duration-200'>Join Now</Button></Link>
        </div>
    </div>
  )
}

export default Nav