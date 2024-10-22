<?php

namespace App\Repositories;

use App\Models\Room;

class RoomEloquentRepository implements RoomRepositoryInterface
{
    public function all()
    {
        return Room::all();
    }

    public function find($id)
    {
        return Room::findOrFail($id);
    }

    public function create(array $data): Room
    {
        return Room::create($data);
    }

    public function update(Room $room, array $data): Room
    {
        $room->update($data);
        return $room;
    }

    public function delete(Room $room): bool
    {
        return $room->delete();
    }
}
