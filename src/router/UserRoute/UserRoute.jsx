import React from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router';

const UserRoute = ({children}) => {

    const navigate = useNavigate()

    const { loading } = useAuth();

    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'user') {
        // return <Forbidden></Forbidden>
        navigate('/dashboard')
    }

    return children;
};

export default UserRoute;