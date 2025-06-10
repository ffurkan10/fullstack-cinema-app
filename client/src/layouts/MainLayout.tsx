import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { AppDispatch } from '../store/store';
import { getUserInformation } from '../features/auth/authSlice';
import { setIsOpenAccount } from '../features/layout/layoutSlice';

const MainLayout = () => {
    const userId = localStorage.getItem("userId");
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
      if (userId) {
        dispatch(getUserInformation(userId))
      }
    }, [userId])

  return (
    <div onClick={() => {
      dispatch(setIsOpenAccount(false))
    }} className='main-layout'>
        <Outlet />
    </div>
  )
}

export default MainLayout