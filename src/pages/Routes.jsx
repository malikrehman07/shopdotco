import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import { useAuthContext } from '../context/Auth'
import PrivateRoute from '../components/PrivateRoute'
import CustomerDashboard from './CustomerDashboard'
import SellerDashboard from './SellerDashboard'
const Index = () => {
  const { isAuth } = useAuthContext()
  return (
    <>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
        <Route path='/dashboard/*' element={<PrivateRoute Component={SellerDashboard} role="seller" />} />
        <Route path='/customer/*' element={<PrivateRoute Component={CustomerDashboard} role="customer" />} />
      </Routes>
    </>
  )
}

export default Index
