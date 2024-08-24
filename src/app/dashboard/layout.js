import React from 'react'
import SideNav from './_components/SideNav'

function Dashboard({children}) {
    return (
    <div>
        <div className='md:w-64 fixed hidden md:block'>
            <SideNav></SideNav>
        </div>
        <div className='md:ml-64'>{children}</div>
        
    </div>
  )
}

export default Dashboard