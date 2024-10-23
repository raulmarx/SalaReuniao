import React, { useState, useEffect } from 'react';
import { getRoomsNotInUser, createReserve } from '../services/api';
import ReserveModal from '../components/ReserveModal';

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReserve, setNewReserve] = useState({ room_id: '', responsible: '', start_reservation: '', end_reservation: '' });

    useEffect(() => {
        let isMounted = true;

        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await getRoomsNotInUser();
                if (isMounted) {
                    setRooms(response.data.data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleOpenModal = (roomId) => {
        setNewReserve({ room_id: roomId, responsible: '', start_reservation: '', end_reservation: '' });
        setIsModalOpen(true);
    };

    const handleCreateReserve = async (reserveData) => {        
        try {
            if (!reserveData.room_id || !reserveData.responsible || !reserveData.start_reservation || !reserveData.end_reservation) return;
            await createReserve(reserveData);
        } catch (error) {
            setError(error.message);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Salas</h1>
            
            {loading ? (
                <p>Carregando...</p>
            ) : (
                rooms.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="min-w-full bg-white rounded-lg divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome da Sala</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {rooms.map((room) => (
                                    <tr key={room.id} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{room.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleOpenModal(room.id)}
                                                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-200"
                                            >
                                                Nova Reserva
                                            </button>                                        
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Não há salas disponíveis.</p>
                )
            )}
            {isModalOpen && (
                <ReserveModal
                    reserve={[newReserve,rooms]}
                    onSave={handleCreateReserve}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default RoomsPage;
