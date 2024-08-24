import { LayoutIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function SideNav() {
    const menuList = [
        {
            id:1,
            name:'Dashboard',
            icon:LayoutIcon,
            path: '/dashboard',
       }
    ]
  return (
    <div className='border h-screen shadow-md '>
       <Image src={'/logo.svg'} width={80} height={40} className='mx-auto mt-6' alt='logo'></Image>
    </div>
  )
}

export default SideNav