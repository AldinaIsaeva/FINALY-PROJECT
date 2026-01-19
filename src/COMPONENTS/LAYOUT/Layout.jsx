import React from 'react'
import "./Layout.css"
import Header from '../HEADER/Header'
import Footer from '../FOOTER/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='layout'>
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout
