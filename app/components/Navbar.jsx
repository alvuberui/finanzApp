'use client';
import React, { useState } from 'react'
import "../../app/globals.css";
import Link from 'next/link';


const Navbar = () => {

  const [isLogged, setIsLogged] = useState(true)

  return (
  
      <nav className="bg-lime-300 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                <p className="text-2xl font-bold text-gray-900 transition-all hover:text-3xl">finanzApp</p>
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/*<!-- Profile dropdown -->*/}
              <div className="relative ml-3">
                <div className='flex items-center mb-0'>
                  {isLogged === false ? (
                    <Link href="/register" >
                      <button
                        type="button"
                        className="group relative bg-gradient-to-r from-red-400 to-yellow-500 rounded p-2 m-2 shadow-md overflow-hidden transform transition-transform hover:scale-105"
                      >
                        <span className="relative z-10">Regístrate</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      </button>
                    </Link>
                  ) : (
                    <>
                      <i className="material-icons text-4xl rounded-full bg-red-400 text-black p-2 mr-3 hover:scale-110 transition-transform">add</i>
                      <i className="material-icons text-4xl rounded-full bg-red-400 text-black p-2 mr-3 hover:scale-110 transition-transform">person</i>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    
  )
}

export default Navbar
