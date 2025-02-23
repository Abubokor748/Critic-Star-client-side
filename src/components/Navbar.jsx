import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import websiteIcon from "../../src/assets/IconForWeb-Fav.png";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    // console.log(user);

    const handleSignout = () => {
        logOut()
            .then(() => {
                // console.log('success');
                toast.success("Logged out Successfully");
            })
            .catch(error => {
                // console.log('error with log out');
                toast.error("Something went wrong");
            })
    }

    const menu = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/all_Services">Services</NavLink></li>
        
        {
            user ? <>
                <li><NavLink to="/add_services">Add Service</NavLink></li>
                <li><NavLink to="/reviews">Reviews</NavLink></li>
                <li><NavLink to="/my_reviews">My Reviews</NavLink></li>
                <button onClick={handleSignout}>Sign out</button>
            </> : <>
                <Link className="btn" to="/auth/login">Log In</Link> </>
        }
    </>

    return (
        <div>
            <div className="navbar bg-base-100">
                {/* nav start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {menu}

                        </ul>
                    </div>
                    <Link to="/"><img src={websiteIcon} className='w-10 ml-3' alt="" /></Link>
                    <h2 className='ml-4 font-bold'>Critic Star</h2>
                </div>

                {/* nav center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 items-center gap-3">
                        {menu}
                    </ul>
                    
                </div>

                {/* nav end */}
                <div className='navbar-end space-x-6'>
                <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Profile"
                                    src={user?.photoURL || "https://via.placeholder.com/150"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default Navbar;