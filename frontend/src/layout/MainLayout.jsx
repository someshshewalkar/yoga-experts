import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/headers/Navbar'

const MainLayout = () => {
  return (
    <main className='dark:bg-black overflow-hidden'>
    <Navbar/>
        <Outlet/>
        <footer>footers</footer>
    </main>
  )
}

export default MainLayout