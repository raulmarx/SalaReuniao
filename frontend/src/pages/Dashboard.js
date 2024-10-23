import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RoomsPage from './RoomsPage';
import ReservesPage from './ReservesPage'; 
import MyRoomsPage from './MyRoomsPage'; 

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="p-6">
                <Routes>
                    <Route path="rooms" element={<RoomsPage />} />
                    <Route path="reserves" element={<ReservesPage />} />
                    <Route path="myrooms" element={<MyRoomsPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
