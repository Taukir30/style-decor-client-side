import React from 'react';
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://style-decor-server-gilt.vercel.app'
    // baseURL: 'http://localhost:3000'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
