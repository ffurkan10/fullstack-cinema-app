import styled from 'styled-components'
import { AdminNavigationTypes } from '../../interfaces/adminTypes'
import AdminPages from '../../utils/AdminPages'
import { Link, useLocation } from 'react-router-dom'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: var(--color-secondary-bg);
    padding: 20px 24px;
    
    .nav-list{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin: 0 auto;
        a{
            color: #fff;
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-md);
            text-decoration: none;
            cursor: pointer;
        }
        .selected-nav-item{
            color: var(--color-main);
        }
    }

    @media (max-width: 768px) {
        .nav-list{
            width: 100%;
        }
    }
`

const AdminNavigation = () => {
    const path = useLocation().pathname


  return (
    <Container className='admin-navigation'>
        <div className="nav-list">
            {AdminPages.map((page: AdminNavigationTypes) => (
                <Link className={path === page?.slug ? "selected-nav-item" : ""} key={page.slug} to={page.slug}>
                    {page.name}
                </Link>
            ))}
        </div>
    </Container>
  )
}

export default AdminNavigation