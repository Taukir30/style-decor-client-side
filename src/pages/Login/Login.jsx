import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import useAuth from '../../hooks/useAuth';

const Login = () => {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signInUser } = useAuth();

    const navigate = useNavigate();

    const location = useLocation();

    const handleLogin = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(location.state || '/');
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div className='w-full md:w-[60%] flex flex-col gap-3'>
            <h1 className='text-3xl font-bold'>Welcome Back</h1>
            <p className='font-semibold text-sm'>Login with StyleDecor</p>
            <form onSubmit={handleSubmit(handleLogin)} className='w-full'>
                <fieldset className="fieldset">
                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full rounded-4xl" placeholder="Email" />
                    {
                        errors.email?.type === 'required' &&
                        <p className='text-red-500'>Email is required</p>
                    }

                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
                    })} className="input w-full rounded-4xl" placeholder="Password" />
                    {
                        errors.password?.type === 'required' &&
                        <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' &&
                        <p className='text-red-500'>Password must be 6 character or longer</p>
                    }
                    {
                        errors.password?.type === 'pattern' &&
                        <p className='text-red-500'>Password must contain minimum one uppercase, one lower case, one number and one special characterr</p>
                    }

                    {/* forget */}
                    <div><Link to='/login' state={location.state} className="link link-hover"> Forgot Password? </Link></div>
                    <button className="btn btn-primary text-black mt-4 rounded-4xl">Login</button>
                    <div>Don’t have any account? <Link to='/register' className="link link-hover"> Register</Link></div>

                </fieldset>
            </form>
            <span className='text-center text-xs'>OR</span>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;