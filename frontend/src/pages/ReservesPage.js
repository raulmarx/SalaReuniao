import React, { useState, useEffect } from 'react';
import { getReserves, createReserve, updateReserve, deleteReserve } from '../services/api';

const ReservesPage = () => {
    const [reserves, setReserves] = useState([]);
    const [error, setError] = useState(null);
    const [newReserve, setNewReserve] = useState({ room_id: '', start_time: '', end_time: '' });
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

    const handleOpenModal = () => {
        setNewReserve({ room_id: '', start_time: '', end_time: '' }); 
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleCreateOrUpdateReserve = async () => {
        if (isEditing) {
            try {
                const response = await updateReserve(editReserveId, newReserve);
                setReserves((prevReserves) =>
                    prevReserves.map((reserve) => (reserve.id === editReserveId ? response.data.data : reserve))
                );
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                const response = await createReserve(newReserve);
                setReserves((prevReserves) => [...prevReserves, response.data.data]);
            } catch (error) {
                setError(error.message);
            }
        }

        setIsModalOpen(false);
        setEditReserveId(null); 
    };

    const handleEditReserve = (reserve) => {
        setEditReserveId(reserve.id);
        setNewReserve({ room_id: reserve.room_id, start_time: reserve.start_time, end_time: reserve.end_time });
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Reservas</h1>
            {error && <div className="text-red-500">{error}</div>}

            {reserves.length > 0 ? (
                <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
                    {reserves.map((reserve) => (
                        <li key={reserve.id} className="flex justify-between items-center p-4 hover:bg-gray-100">
                            <span className="font-semibold">{`Sala ID: ${reserve.room_id}, Início: ${reserve.start_time}, Fim: ${reserve.end_time}`}</span>
                            <div className="flex items-center">
                                <button
                                    onClick={handleOpenModal}
                                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-200"
                                >
                                    Nova Reserva
                                </button>
                                <button
                                    onClick={() => handleEditReserve(reserve)}
                                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600 transition duration-200"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteReserve(reserve.id)}
                                    className="bg-red-500 text-white py-1 px-2 rounded mr-2 hover:bg-red-600 transition duration-200"
                                >
                                    Cancelar
                                </button>



                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Não há reservas disponíveis.</p>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Reserva' : 'Nova Reserva'}</h2>
                        <input
                            type="text"
                            value={newReserve.room_id}
                            onChange={(e) => setNewReserve({ ...newReserve, room_id: e.target.value })}
                            placeholder="ID da sala"
                            className="border border-gray-300 rounded p-2 w-full mb-2"
                        />
                        <input
                            type="datetime-local"
                            value={newReserve.start_time}
                            onChange={(e) => setNewReserve({ ...newReserve, start_time: e.target.value })}
                            placeholder="Data e Hora de Início"
                            className="border border-gray-300 rounded p-2 w-full mb-2"
                        />
                        <input
                            type="datetime-local"
                            value={newReserve.end_time}
                            onChange={(e) => setNewReserve({ ...newReserve, end_time: e.target.value })}
                            placeholder="Data e Hora de Término"
                            className="border border-gray-300 rounded p-2 w-full mb-2"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleCreateOrUpdateReserve}
                                className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600 transition duration-200"
                            >
                                {isEditing ? 'Atualizar' : 'Salvar'}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservesPage;
