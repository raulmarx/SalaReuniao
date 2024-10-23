import React, { useState } from 'react';

const RoomModal = ({ room, onUpdate, onClose }) => {
    const [roomName, setRoomName] = useState(room.name);

    const handleUpdate = () => {
        if (roomName.trim()) {
            onUpdate({ ...room, name: roomName });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Editar Sala</h2>
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Nome da sala"
                    className="border border-gray-300 rounded p-2 w-full mb-4"
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600 transition duration-200"
                    >
                        Atualizar
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomModal;
