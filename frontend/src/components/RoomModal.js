import React, { useState } from 'react';

const RoomModal = ({ room, onUpdate, onClose }) => {
    const [updatedRoom, setUpdatedRoom] = useState(room);

    const handleChange = (e) => {
        setUpdatedRoom({ ...updatedRoom, name: e.target.value });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Editar Sala</h2>
                <input
                    type="text"
                    value={updatedRoom.name}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full mb-4"
                />
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onUpdate(updatedRoom)}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomModal;
