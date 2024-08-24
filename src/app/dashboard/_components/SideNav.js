"use client"

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function SideNav() {
    const {user}  = useKindeBrowserClient();

    const menuList = [
        {
            id:1,
            name:'Dashboard',
            icon:LayoutIcon,
            path: '/dashboard',
       },
       {
        id:2,
        name:'Students',
        icon:GraduationCap,
        path:'/dashboard/students'
       },
       {
        id:3,
        name:'Attendance',
        icon:Hand,
        path:'/dashboard/attendance'
       },
       {
        id:4,
        name:'Settings',
        icon:Settings,
        path:'/dashboard/settings'
       }
    ]
  return (
    <div className='border h-screen shadow-md '>
       <Image src={'/logo.svg'} width={80} height={40} className='mx-auto mt-6' alt='logo'></Image>
       <hr className='my-5'/>
       <div>
           {
             menuList.map((item, idx) => (
                <h2 className='flex items-center my-2 gap-3 text-md p-4 text-slate-500 hover:bg-primary cursor-pointer hover:text-white hover:dark:text-black rounded-lg'>
                    <item.icon></item.icon>
                    {item.name}
                </h2>
             ))
           }
       </div>
        
        <div className='flex gap-2 items-center fixed bottom-5 p-4'>
            <Image src={user?.picture} width={35} height={35} alt='user' className='rounded-full'></Image>
            <div>
                <h2 className='text-sm font-bold'>{user?.given_name} {user?.family_name}</h2>
                <h2 className='text-xs text-slate-400'>{user?.email}</h2>
            </div>
        </div>

    </div>
  )
}

export default SideNav