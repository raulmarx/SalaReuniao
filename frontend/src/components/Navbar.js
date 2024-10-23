import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout as logoutService } from '../services/api'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutService({}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        localStorage.removeItem('token');
        navigate('/');
      })
      .catch((err) => {
        console.error('Erro ao fazer logout:', err);
      });
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/dashboard/rooms" className="hover:text-gray-400">Salas</Link>
          <Link to="/dashboard/reserves" className="hover:text-gray-400">Reservas</Link>
          <Link to="/dashboard/myrooms" className="hover:text-gray-400">Minhas Salas</Link>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
