import { useState } from 'react'

import { Outlet } from 'react-router'
import { Link } from 'react-router'
import logo from './assets/doc-search.svg'

export const getEmptyChar = () => 
{
    return "‎";
}

const Nav = () =>
{
    return (
      <header className=' w-full h-10 text-white flex justify-between px-10 py-8 
        font-semibold text-lg font-bitter'>
      
          <div className="flex w-1/2 h-fit">
            <Link to="/">
              <img 
                className='invert w-10'
                src={logo}/>
              </Link>
          </div>
          <div className="flex gap-8 h-fit tracking-wider">
          <div className="flex"><Link to="/login">login</Link></div>
          <div className="flex"><Link to="/">signup</Link></div>
          </div>
      </header>
    )
}



function App() {

  return (

<div className="min-h-screen w-full bg-zinc-900 from-zinc-950 bg-linear-to-bl relative text-white">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(34, 197, 94, 0.12) 20px, rgba(34, 197, 94, 0.12) 21px),
            repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(16, 185, 129, 0.10) 30px, rgba(16, 185, 129, 0.10) 31px),
            repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(59, 130, 246, 0.08) 40px, rgba(59, 130, 246, 0.08) 41px),
            repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(147, 51, 234, 0.06) 35px, rgba(147, 51, 234, 0.06) 36px)
          `,
        }}
      />
          <Nav /> 
        <Outlet />
        </div>
        // <div className='bg-zinc-900 w-full h-full'>
        // </div>
  )
}

export default App
