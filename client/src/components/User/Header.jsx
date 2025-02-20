import React from 'react'
import assets from '../../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col items-center mt-20 px-4 test-center
    text-gray-800'> 
        <img src={assets.header} alt="" 
        className='w-36 h-36 rounded-full mb-6'/>

        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey Developer

          <img className='w-8 aspect-square' src = {assets.handwave}/>

        </h1>
        
        <h2 className='text-3xl sm:text-5xl font-semiblod mb-4'>Welcome to our app</h2>
        
        <p>Lets start with a quick product tour and we will have you up and 
        running in no time.
        </p>
        
        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-100'>Get Started</button>
    </div>
  )
}

export default Header