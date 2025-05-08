import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ClosedRoute({children}) {
    const {user} = useSelector(state => state.Profile);
    const {token} = useSelector(state => state.auth);

    if(!user || !token){
        return <Navigate to={'/login'} />
    }

  return children;
}

export default ClosedRoute;
