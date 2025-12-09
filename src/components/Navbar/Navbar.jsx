
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import LogoMini from '../Logo/LogoMini';
import useAuth from '../../hooks/useAuth';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {

    const { user, logOut } = useAuth();

    console.log(user)

    const handleLogout = () => {
        logOut()
            .then(resut => {
                console.log(resut);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const item = <>
        <li><NavLink to='/servises'>Services</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        <li><NavLink to='/pricing'>Pricing</NavLink></li>
        <li><NavLink to='/send-parcel'>Send Parcel</NavLink></li>
    </>

    return (
        <div className='bg-transparent pt-5 flex justify-center items-center sticky top-0 z-10'>
            <div className="navbar w-[90%] bg-base-100 rounded-4xl px-3 min-h-[55px] h-[55px] z-20 border border-primary shadow-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {item}
                        </ul>
                    </div>
                    <div className='hidden sm:block'>
                        <Logo></Logo>
                    </div>
                    <div className='blocl sm:hidden'>
                        <LogoMini></LogoMini>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {item}
                    </ul>
                </div>
                <div className="navbar-end flex gap-2">
                    {
                        // user ?
                        //     <button onClick={handleLogout} className='btn btn-outline btn-secondary text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]'>Log out</button> :
                        //     <Link to='/login' className="btn btn-outline btn-secondary text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]">Login</Link>
                    }
                    {
                        user && <Link to='/dashboard' className="hidden md:flex btn btn-outline btn-secondary text-secondary rounded-4xl h-[35px] hover:text-[#FBBA72]">Dashboard</Link>
                    }
                    {
                        user ?
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-primary text-secondary shadow-none rounded-4xl h-[35px] pl-1">
                                    <img src={user?.photoURL} alt="" className='h-[26px] rounded-4xl'/>
                                    {/* <IoIosArrowDown /> */}
                                    Profile
                                </div>
                                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-28 p-1 shadow-sm">
                                    <li>
                                        <button onClick={handleLogout} className=''>Log out</button>
                                    </li>
                                    <li><Link>Edit Profile</Link></li>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                </ul>
                            </div> :
                            <Link to='/login' className="btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]">Login</Link>
                    }

                    {/* <Link to='/join' className="btn btn-primary text-secondary shadow-none rounded-4xl h-[35px]">Join Us</Link> */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;