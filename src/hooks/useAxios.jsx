import React from 'react';
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://style-decor-server-gilt.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
