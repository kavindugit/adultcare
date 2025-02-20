import React from 'react'
import Navbar from '../components/User/Navbar'
import Header from '../components/User/Header'

const Home = () => {
  return (
    <div className='flex flex-col item-cnter justify-center min-h-screen
      bg-[url("/bg_img.png")] bg-cover bg-center'>
        <Navbar />
        <Header />
    </div>
  )
}

export default Home