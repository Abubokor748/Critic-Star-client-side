import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    if (user && user?.email) {
        return children;
    }

    return (
        <Navigate to="/auth/login"></Navigate>
    );
};

export default PrivateRoute;