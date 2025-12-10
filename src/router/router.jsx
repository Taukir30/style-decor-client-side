import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllServices from "../pages/AllServices/AllServices";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import AddCoverage from "../pages/Dashboard/AddCoverage/AddCoverage";
import Coverage from "../pages/Dashboard/AddCoverage/Coverage";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import MyBookings from "../pages/Dashboard/MyBookings";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'allservices',
                Component: AllServices
            },
            {
                path: 'servicedetails/:id',
                Component: ServiceDetails
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
        children: [
            {
                path: 'coverage',
                Component: Coverage
            },
            {
                path: 'add-coverage',
                Component: AddCoverage
            },
            {
                path: 'my-bookings',
                Component: MyBookings
            }
        ]
    }

])