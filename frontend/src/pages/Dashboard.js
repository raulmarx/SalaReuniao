import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RoomsPage from './RoomsPage';
import ReservesPage from './ReservesPage'; 

const Dashboard = () => {
    return (
        <div>
            {/* Menu superior */}
            <Navbar />

            {/* Conteúdo dinâmico das abas */}
            <div className="p-6">
                <Routes>
                    <Route path="rooms" element={<RoomsPage />} />
                    <Route path="reserves" element={<ReservesPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
