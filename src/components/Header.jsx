import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Header() {
    const location = useLocation()
    
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true
        }
    }


  return (
    <div className='bg-black border-b shadow-sm sticky top-0 mx-auto'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto '>
            <div>
                <a href='/' className='cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent '>WATCHFLIX</a>
            </div>

            <div>
                <ul className='flex space-x-10'>
                    <a href='/' className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/') && "text-black border-b-red-500"}`}>Home</a>

                    <a href='/movies' className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/movies') && "text-black border-b-red-500"}`}>Movies</a>

                    <a href='/series' className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/series') && "text-black border-b-red-500"}`}>Series</a>
                </ul>
            </div>
        </header>
    </div>
  )
}
