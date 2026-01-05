import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const UserProtectWrapper = ({ children,roles }) => {
     const { token, user } = useContext(AuthContext);
    const token1 = localStorage.getItem('token'); // Removed `await`
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token1) {
            navigate('/');
            return;
        }
    }, [navigate]); // Removed `token` from dependencies

    if (roles && !roles.includes(user?.role)) {
    navigate('/');
  }

    return <>{children}</>;
};

export default UserProtectWrapper;
