import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar at the top */}
            <Navbar />

            {/* Main content area - flex-grow ensures it takes up remaining space */}
            <div className="flex-grow">
                <Outlet />
            </div>

            {/* Footer at the bottom */}
            <Footer />
        </div>
    );
};

export default MainLayout;