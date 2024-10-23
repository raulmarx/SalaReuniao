import React, { useState, useEffect } from 'react';
import { getRooms, createRoom, deleteRoom, updateRoom } from '../services/api';
import RoomModal from '../components/RoomModal';

const MyRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [newRoomName, setNewRoomName] = useState('');
    const [editRoom, setEditRoom] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await getRooms();
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

    const handleCreateRoom = async () => {
        if (!newRoomName) return;
        try {
            const response = await createRoom({ name: newRoomName });
            setRooms((prevRooms) => [...prevRooms, response.data.data]);
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
        setEditRoom(room); 
    };

    const handleUpdateRoom = async () => {
        if (!editRoom.name) return;
        try {
            const response = await updateRoom(editRoom.id, { name: editRoom.name });
            setRooms((prevRooms) =>
                prevRooms.map((room) => (room.id === editRoom.id ? response.data.data : room))
            );
            setEditRoom(null); 
        } catch (error) {
            setError(error.message);
        }
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
            {loading ? (
                <p>Carregando...</p>
            ) : (
                rooms.length > 0 ? (
                    <table className="min-w-full bg-white rounded-lg shadow-md divide-y divide-gray-200">
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
                                            onClick={() => handleEditRoom(room)}
                                            className="bg-yellow-500 text-white py-1 px-2 rounded ml-2 hover:bg-yellow-600 transition duration-200"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRoom(room.id)}
                                            className="bg-red-500 text-white py-1 px-2 rounded ml-2 hover:bg-red-600 transition duration-200"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Não há salas disponíveis.</p>
                )
            )}
            {editRoom && (
                <RoomModal 
                    room={editRoom}
                    onUpdate={handleUpdateRoom}
                    onClose={() => setEditRoom(null)}
                />
            )}            
        </div>
    );
};

export default MyRoomsPage;
