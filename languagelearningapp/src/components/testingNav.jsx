import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { logoutUser } from '../utils/auth';
import { userContext } from '../context/AuthContext';


export default function TestNavbar() {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(user, setUser, navigate, toast);
  }

  return (
    <nav>
      <Link to='/'>Home</Link>
      {/* <Link to='/dashboard'>Dashboard</Link> */}
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}
