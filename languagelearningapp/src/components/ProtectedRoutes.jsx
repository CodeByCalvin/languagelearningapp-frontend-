import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { userContext } from '../context/AuthContext';

export default function ProtectedRoutes() {
  const { user } = useContext(userContext);
  console.log(user);
  console.log(user ? 'User is logged in' : 'User is not logged in');
  return (
    <>
      {user ? <Outlet /> : <Navigate to='/login' />}
    </>
  )   
}
