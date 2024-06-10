import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Sidebar from '../components/Sidebar';

const Home = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    useEffect(() => {
      if (auth.user === null) {
        navigate("/login");
      }
    });
  return (
    <div className='bg-black'>
      <Sidebar/>
     
    
    </div>
  )
}

export default Home
