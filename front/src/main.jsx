import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import { Navigate } from 'react-router'
import { Link } from 'react-router'
import cvExample from './assets/cv-example.webp'
import { Login } from './Login.jsx'

const Dashboard = () =>
{

}



const Signup = () => {
  return (<div>Signup please</div>)
}

const Hero = () => 
{
  return (
    <div className="
    flex sm:flex-row flex-col
    font-funnel 
    sm:items-start items-center justify-center">

      <div className="flex flex-col gap-2 sm:mt-20">
        <h2 className='sm:text-3xl text-xl font-bold'>Tired of manual search?</h2>
        <h2 className='sm:text-xl text-lg font-semibold'>Upload your company docs.</h2>
        <h6 className='sm:text-lg text-sm'>and we do the search for you.</h6>
        <p className='sm:text-xs text-xs font-light italic'>totally secure, no worries</p>

        <Link
          to="/dashboard"
          className='border-zinc-700 border-2 
          
          flex items-center justify-center
          cursor-pointer  
        text-zinc-200 w-1/4 rounded-xs mt-4'>upload</Link>

      </div>
      <img
        className='flex items-center justify-center sm:w-1/3 w-0'
        src={cvExample} 
        />

    </div>
  )
}
import { BrowserRouter, Route, Routes } from "react-router";

const PrivateWrapper = ({ isAuthenticated = false  }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route index element={<Hero />} />
      </Route>
      <Route element={<PrivateWrapper />}>
        <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    </Routes>
    
    </BrowserRouter>,
)
