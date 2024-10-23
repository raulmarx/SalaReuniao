import React, { useState, useEffect } from 'react';
import { getReserves, createReserve, updateReserve, deleteReserve } from '../services/api';
import ReserveModal from '../components/ReserveModal';

const ReservesPage = () => {
    const [reserves, setReserves] = useState([]);
    const [error, setError] = useState(null);
    const [newReserve, setNewReserve] = useState({ name: '', responsible: '', start_reservation: '', end_reservation: '' });
    const [editReserveId, setEditReserveId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchReserves = async () => {
            try {
                const response = await getReserves();
                if (isMounted) {
                    setReserves(response.data.data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error.message);
                }
            }
        };

        fetchReserves();

        return () => {
            isMounted = false;
        };
    }, []);


    const handleCreateOrUpdateReserve = async () => {
        try {
            const response = await updateReserve(editReserveId, newReserve);
            setReserves((prevReserves) =>
                prevReserves.map((reserve) => (reserve.id === editReserveId ? response.data.data : reserve))
            );
        } catch (error) {
            setError(error.message);
        }

        setIsModalOpen(false);
        setEditReserveId(null);
    };

    const handleEditReserve = (reserve) => {
        setEditReserveId(reserve.id);
        setNewReserve({ room_id: reserve.room.id, responsible: reserve.responsible, start_reservation: reserve.start_reservation, end_reservation: reserve.end_reservation });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDeleteReserve = async (id) => {
        try {
            await deleteReserve(id);
            setReserves((prevReserves) => prevReserves.filter((reserve) => reserve.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-2xl font-bold mb-4">Reservas</h1>
            {error && <div className="text-red-500">{error}</div>}

            {reserves.length > 0 ? (
                <table className="min-w-full bg-white rounded-lg shadow-md divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fim</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reserves.map((reserve) => (
                            <tr key={reserve.id} className={`hover:bg-gray-100 border-b border-gray-300 ${reserve.status === 'cancelado' || new Date(reserve.end_reservation) < new Date() ? 'opacity-50 pointer-events-none' : ''}`}>
                                <td className="px-6 py-4 whitespace-nowrap">{reserve.room.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reserve.responsible}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reserve.start_reservation}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reserve.end_reservation}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reserve.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEditReserve(reserve)} className="bg-yellow-500 text-white py-1 px-2 rounded ml-2 hover:bg-yellow-600 transition duration-200" disabled={reserve.status === 'cancelado' || new Date(reserve.end_reservation) < new Date()}>Editar</button>
                                    <button onClick={() => handleDeleteReserve(reserve.id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2 hover:bg-red-600 transition duration-200" disabled={reserve.status === 'cancelado' || new Date(reserve.end_reservation) < new Date()}>Cancelar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">Não há reservas disponíveis.</p>
            )}

            {isModalOpen && (                
                <ReserveModal
                    reserve={[newReserve,'']}
                    onSave={handleCreateOrUpdateReserve}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ReservesPage;
