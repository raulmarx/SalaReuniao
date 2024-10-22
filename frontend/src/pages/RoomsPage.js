import React, { useState, useEffect } from 'react';
import { getRooms, createRoom, deleteRoom, updateRoom, createReserve } from '../services/api'; 

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [newRoomName, setNewRoomName] = useState('');
    const [editRoomId, setEditRoomId] = useState(null);
    const [editRoomName, setEditRoomName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [newReserve, setNewReserve] = useState({ room_id: '', responsible: '',start_reservation: '', end_reservation: '' }); 

    useEffect(() => {
        let isMounted = true;

        const fetchRooms = async () => {
            try {
                const response = await getRooms();
                if (isMounted) {
                    setRooms(response.data.data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error.message);
                }
            }
        };

        fetchRooms();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleCreateRoom = async () => {
        if (!newRoomName) return; 
        try {
            const response = await createRoom({ name: newRoomName });
            //setRooms((prevRooms) => [...prevRooms, response.data.data]);
            setNewRoomName(''); 
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteRoom = async (id) => {
        try {
            await deleteRoom(id);
            setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditRoom = (room) => {
        setEditRoomId(room.id);
        setEditRoomName(room.name);
        setIsEditing(true);
    };

    const handleUpdateRoom = async () => {
        if (!editRoomName) return; 
        try {
            const response = await updateRoom(editRoomId, { name: editRoomName });
            setRooms((prevRooms) =>
                prevRooms.map((room) => (room.id === editRoomId ? response.data.data : room))
            );
            setIsEditing(false);
            setEditRoomName(''); 
            setEditRoomId(null); 
        } catch (error) {
            setError(error.message);
        }
    };

    const handleOpenModal = (roomId) => {
        setNewReserve({ room_id: roomId, responsible: '' ,start_reservation: '', end_reservation: '' }); 
        setIsModalOpen(true);
    };

    const handleCreate = async () => {
        try {
            
            if (!newReserve.room_id || !newReserve.responsible || !newReserve.start_reservation || !newReserve.end_reservation) return;
            const response = await createReserve(newReserve);
            
        } catch (error) {
            setError(error.message);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Salas</h1>
            {error && <div className="text-red-500">{error}</div>}
            <div className="mb-4">
                <input
                    type="text"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="Nome da nova sala"
                    className="border border-gray-300 rounded p-2 w-1/2"
                />
                <button
                    onClick={handleCreateRoom}
                    className="bg-blue-500 text-white py-2 px-4 rounded ml-2 hover:bg-blue-600 transition duration-200"
                >
                    Criar Sala
                </button>
            </div>
            {rooms.length > 0 ? (
                <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
                    {rooms.map((room) => (
                        <li key={room.id} className="flex justify-between items-center p-4 hover:bg-gray-100">
                            <span className="font-semibold">{room.name}</span>
                            <div>
                                <button
                                    onClick={() => handleOpenModal(room.id)} 
                                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-200"
                                >
                                    Nova Reserva
                                </button>
                                <button
                                    onClick={() => handleEditRoom(room)}
                                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600 transition duration-200"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteRoom(room.id)}
                                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200"
                                >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Não há salas disponíveis.</p>
            )}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Editar Sala</h2>
                        <input
                            type="text"
                            value={editRoomName}
                            onChange={(e) => setEditRoomName(e.target.value)}
                            placeholder="Nome da sala"
                            className="border border-gray-300 rounded p-2 w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdateRoom}
                                className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600 transition duration-200"
                            >
                                Atualizar
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Nova Reserva</h2>
                        <input
                            type="text"
                            value={newReserve.responsible}
                            onChange={(e) => setNewReserve({ ...newReserve, responsible: e.target.value })}
                            placeholder="Responsável"
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
                                onClick={handleCreate}
                                className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600 transition duration-200"
                            >
                                Salvar
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

export default RoomsPage;
