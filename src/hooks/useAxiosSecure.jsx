import React from 'react';

import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {

    const { user } = use(AuthContext);

    useEffect( () => {
        
        //set token with using interceptor
        const requestInterceptor = instance.interceptors.request.use( (config) => {
    
            config.headers.authorization = `Bearer ${user.accessToken}`
            return config;
        } )

        return () => {
            instance.interceptors.request.eject(requestInterceptor)
        }

    }, [user])

    return instance;
};

export default useAxiosSecure;