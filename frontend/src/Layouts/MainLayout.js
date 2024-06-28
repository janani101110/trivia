import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Component/Navbar/Navbar';
import { Footer } from '../Component/Footer/Footer';
import Loader from '../Component/Loader/Loader'; // Correct import for Loader component

const MainLayout = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Simulating loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader /> // Display loader while loading is true
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default MainLayout;
