import React from 'react';
import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { useNavigate } from 'react-router';

const instance = axios.create({
    baseURL: 'https://style-decor-server-gilt.vercel.app'
    // baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    
    const { user, logOut } = use(AuthContext);

    const navigate = useNavigate();

    useEffect( () => {
        
        //set token using interceptor

        //interceptor request
        const requestInterceptor = instance.interceptors.request.use( (config) => {
    
            config.headers.authorization = `Bearer ${user?.accessToken}`
            return config;
        } )

        //interceptor response
        const responseInterceptor = instance.interceptors.response.use( (response) => {
            return response;
        }, (error) => {
            console.log(error);

            const statusCode = error.status;
            if(statusCode === 401 || statusCode === 403){
                logOut()
                    .then( () => {
                        navigate('/login');
                    })
            }

            return Promise.reject(error);
        })

        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        }

    }, [user, logOut, navigate])

    return instance;
};

export default useAxiosSecure;