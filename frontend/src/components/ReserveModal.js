import React, { useState } from 'react';

const ReserveModal = ({ reserve, onSave, onClose }) => {
    const [newReserve, setNewReserve] = useState(reserve[0]);
    const [newRooms, setNewRooms] = useState(reserve[1]);
    const [error, setError] = useState('');

    const handleSave = () => {
        const { room_id, responsible, start_reservation, end_reservation } = newReserve;

        if (!room_id || !responsible || !start_reservation || !end_reservation) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        if (new Date(end_reservation) < new Date(start_reservation)) {
            setError('A data de Final deve ser maior que à data de Início.');
            return;
        }

        if (new Date(start_reservation) <= new Date()) {
            setError('A data de Início deve ser maior que à data atual.');
            return;
        }

        setError('');
        onSave(newReserve);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 md:max-w-lg w-full shadow-lg">
                <h2 className="text-xl font-bold mb-4">Nova Reserva</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}
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
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                />
                <input
                    type="datetime-local"
                    value={newReserve.end_reservation}
                    onChange={(e) => setNewReserve({ ...newReserve, end_reservation: e.target.value })}
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                />
                {newRooms && newRooms.map((room) => (
                    <div key={room.id} className="mb-4 md:mb-8">
                        <div className="bg-gray-100 rounded-lg p-2 shadow-md">
                            <ul className="list-disc md:max-h-48 overflow-y-auto">
                                {room.reserves.filter(reserve => reserve.status === 'reservado' && new Date(reserve.end_reservation) >= new Date()).map((reserve) => (
                                    <li key={reserve.id} className="flex justify-between">
                                        <span>{reserve.status}</span>
                                        <span>{new Date(reserve.start_reservation).toLocaleString('pt-BR')} - {new Date(reserve.end_reservation).toLocaleString('pt-BR')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600 transition duration-200"
                    >
                        Salvar
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

export default ReserveModal;
