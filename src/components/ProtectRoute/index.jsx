import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

export default function ProtectRoute() {
    const { user } = useAuth()

    return (
        <>
            {user && user.created_at ? <Outlet /> : <Navigate to='/' />}
        </>
    )
}
