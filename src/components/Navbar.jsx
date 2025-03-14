import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import websiteIcon from "../../src/assets/IconForWeb-Fav.png";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleSignout = () => {
        logOut()
            .then(() => toast.success("Logged out Successfully"))
            .catch(() => toast.error("Something went wrong"));
    };

    const menu = <>
        <li>
            <NavLink 
                to="/" 
                className={({ isActive }) => 
                    `hover:bg-gradient-to-r from-purple-600 to-blue-500 hover:text-white ${isActive ? 
                    'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : ''}`
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/all_Services"
                className={({ isActive }) => 
                    `hover:bg-gradient-to-r from-purple-600 to-blue-500 hover:text-white ${isActive ? 
                    'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : ''}`
                }
            >
                Services
            </NavLink>
        </li>
        
        {user ? (
            <>
                <li>
                    <NavLink 
                        to="/add_services"
                        className={({ isActive }) => 
                            `hover:bg-gradient-to-r from-purple-600 to-blue-500 hover:text-white ${isActive ? 
                            'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : ''}`
                        }
                    >
                        Add Service
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/reviews"
                        className={({ isActive }) => 
                            `hover:bg-gradient-to-r from-purple-600 to-blue-500 hover:text-white ${isActive ? 
                            'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : ''}`
                        }
                    >
                        Reviews
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/my_reviews"
                        className={({ isActive }) => 
                            `hover:bg-gradient-to-r from-purple-600 to-blue-500 hover:text-white ${isActive ? 
                            'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : ''}`
                        }
                    >
                        My Reviews
                    </NavLink>
                </li>
            </>
        ) : null}
    </>;

    return (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 relative z-50">
            <div className="navbar max-w-7xl mx-auto text-slate-100">
                {/* Mobile Menu */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-slate-800 rounded-box w-52 space-y-2">
                            {menu}
                            {user ? (
                                <button 
                                    onClick={handleSignout}
                                    className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white hover:scale-105 transition-all"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <Link 
                                    to="/auth/login" 
                                    className="btn bg-gradient-to-r from-purple-600 to-blue-500 border-none text-white hover:scale-105 transition-all"
                                >
                                    Log In
                                </Link>
                            )}
                        </ul>
                    </div>
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        <img src={websiteIcon} className="w-12" alt="Website Logo" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                            Critic Star
                        </span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2 text-lg">
                        {menu}
                    </ul>
                </div>

                {/* User Section */}
                <div className="navbar-end gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} className="flex items-center gap-2 cursor-pointer group">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring-2 ring-purple-500 group-hover:ring-blue-400 transition-all">
                                            <img 
                                                src={user?.photoURL || "https://via.placeholder.com/150"} 
                                                alt="User Profile" 
                                            />
                                        </div>
                                    </div>
                                    <span className="hidden md:inline-block font-medium group-hover:text-purple-300 transition-colors">
                                        {user.displayName}
                                    </span>
                                </div>
                                <ul className="dropdown-content menu p-2 shadow bg-slate-800 rounded w-52 mt-4 space-y-2 z-[100]">
                                    <li>
                                        <button 
                                            onClick={handleSignout}
                                            className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white hover:scale-105 transition-all w-full"
                                        >
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Link 
                            to="/auth/login" 
                            className="btn bg-gradient-to-r from-purple-600 to-blue-500 border-none text-white hover:scale-105 transition-all hidden lg:flex"
                        >
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;