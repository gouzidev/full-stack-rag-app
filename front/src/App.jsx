import { useState } from 'react'
// import logo from "@/assets/logo.png";

import { Outlet } from 'react-router'
import { Link } from 'react-router'

const Nav = () =>
{
    return (
      <header className='w-full h-10 text-white flex justify-between p-2'>

        <div className="flex w-1/6"><Link to="/">logo</Link></div>
        <div className="flex gap-4">
        <div className="flex"><Link to="/">login</Link></div>
        <div className="flex"><Link to="/">signup</Link></div>
        </div>
      </header>
    )
}



function App() {

  return (
        <div className='bg-zinc-900 w-full h-full'>
            <Nav />
            <Outlet />
        </div>
  )
}

export default App
