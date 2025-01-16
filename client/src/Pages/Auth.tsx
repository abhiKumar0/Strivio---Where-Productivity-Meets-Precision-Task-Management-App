import React from 'react'
import { Register } from '../Components'

const Auth = () => {
  return (
    <div className='flex justify-between items-center h-screen'>
      <div className="form flex-1 flex justify-center items-center bg-slate-400 h-full">
        <Register />
      </div>
      <div className="img flex-1 bg-blue-400"></div>
    </div>
  )
}

export default Auth