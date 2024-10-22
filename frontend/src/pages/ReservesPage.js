import React, { useState, useEffect } from 'react';
import { getReserves, createReserve, updateReserve, deleteReserve } from '../services/api';

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
                            <tr key={reserve.id} className={`hover:bg-gray-100 border-b border-gray-300 ${reserve.status === 'cancelado' ? 'opacity-50 pointer-events-none' : ''}`}>
                                <td className="px-6 py-4 whitespace-nowrap">{reserve.room.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reserve.responsible}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reserve.start_reservation}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reserve.end_reservation}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reserve.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEditReserve(reserve)} className="bg-yellow-500 text-white py-1 px-2 rounded ml-2 hover:bg-yellow-600 transition duration-200" disabled={reserve.status === 'cancelado'}>Editar</button>
                                    <button onClick={() => handleDeleteReserve(reserve.id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2 hover:bg-red-600 transition duration-200" disabled={reserve.status === 'cancelado'}>Cancelar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">N&atilde;o h&aacute; reservas dispon&iacute;veis.</p>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Reserva' : 'Nova Reserva'}</h2>
                        <input
                            type="text"
                            value={newReserve.responsible}
                            onChange={(e) => setNewReserve({ ...newReserve, responsible: e.target.value })}
                            placeholder="Responsavel"
                            className="border border-gray-300 rounded p-2 w-full mb-2"
                        />
                        <input
                            type="datetime-local"
                            value={newReserve.start_reservation}
                            onChange={(e) => setNewReserve({ ...newReserve, start_reservation: e.target.value })}
                            placeholder="Data e Hora de Início"
                            className="border border-gray-300 rounded p-2 w-full mb-2"
                        />
                        <input
                            type="datetime-local"
                            value={newReserve.end_reservation}
                            onChange={(e) => setNewReserve({ ...newReserve, end_reservation: e.target.value })}
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
