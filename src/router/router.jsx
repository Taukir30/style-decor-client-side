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
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccessful from "../pages/Dashboard/Payment/PaymentSuccessful";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import BeADecorator from "../pages/BeADecorator/BeADecorator";
import AllDecorators from "../pages/Dashboard/AllDecorators";
import UsersManagement from "../pages/Dashboard/UsersManagement";
import DashHome from "../pages/Dashboard/DashHome";
import AdminRoute from "./AdminRoute/AdminRoute";
import Services from "../pages/Dashboard/Services/Services";
import AddService from "../pages/Dashboard/Services/AddService";
import Categories from "../pages/Dashboard/Categories/Categories";
import AddCategory from "../pages/Dashboard/Categories/AddCategory";
import AssignDecorator from "../pages/Dashboard/AssignDecorator";
import DecoratorRoute from "./DecoratorRoute/DecoratorRoute";
import AssignedProjects from "../pages/Dashboard/AssignedProjects";
import TodaySchedule from "../pages/Dashboard/TodaySchedule";
import EarningSummery from "../pages/Dashboard/EarningSummery";
import MyProfile from "../pages/Dashboard/MyProfile";

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
            },
            {
                path: '/beadecorator',
                element: <PrivateRoute> <BeADecorator></BeADecorator> </PrivateRoute>
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
                index: true,
                Component: DashHome
            },
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
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'payment/:id',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSuccessful
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'my-profile',
                Component: MyProfile
            },
            //decorator only routes
            {
                path: 'assigned-projects',
                element: <DecoratorRoute> <AssignedProjects></AssignedProjects> </DecoratorRoute>
            },
            {
                path: 'todays-schedule',
                element: <DecoratorRoute> <TodaySchedule></TodaySchedule> </DecoratorRoute>
            },
            {
                path: 'earning-summery',
                element: <DecoratorRoute> <EarningSummery></EarningSummery> </DecoratorRoute>
            },

            //admin only routes
            {
                path: 'alldecorators',
                element: <AdminRoute> <AllDecorators></AllDecorators></AdminRoute>
            },
            {
                path: 'users-management',
                element: <AdminRoute> <UsersManagement></UsersManagement> </AdminRoute>
            },
            {
                path: 'services-management',
                element: <AdminRoute> <Services></Services> </AdminRoute>
            },
            {
                path: 'add-service',
                element: <AdminRoute> <AddService></AddService> </AdminRoute>
            },
            {
                path: 'all-category',
                element: <AdminRoute> <Categories></Categories> </AdminRoute>
            },
            {
                path: 'add-category',
                element: <AdminRoute> <AddCategory></AddCategory> </AdminRoute>
            },
            {
                path: 'assign-decorator',
                element: <AdminRoute> <AssignDecorator></AssignDecorator> </AdminRoute>
            },
        ]
    }

])