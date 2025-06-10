import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { AppDispatch } from '../store/store';
import { getUserInformation } from '../features/auth/authSlice';
import { setIsOpenAccount } from '../features/layout/layoutSlice';
import styled from 'styled-components';
import AdminNavigation from '../components/navigations/AdminNavigation';

const Container = styled.div`
    width: 100%;
    height: 100%;
`


const AdminLayout = () => {
    const userId = localStorage.getItem("userId");
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
      if (userId) {
        dispatch(getUserInformation(userId))
      }
    }, [userId])

  return (
    <Container onClick={() => {
      dispatch(setIsOpenAccount(false))
    }}>
        <AdminNavigation />

        <Outlet />
    </Container>
  )
}

export default AdminLayout