import React from 'react';

import { Navigate, useLocation } from 'react-router';
import Loading from '../../components/Loading/Loading';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();

    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;