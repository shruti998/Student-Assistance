import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { selector, useRecoilValue } from 'recoil';
import { authSelector } from '../../Auth/authSelector';
import { setUsername } from '../../Store/Actions/rommateAction';

export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {
    const auth = useRecoilValue(authSelector);
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(setUsername(auth.username));
    }, [auth])
    return auth.status ? <Outlet /> : <Navigate to="/login" />;
}