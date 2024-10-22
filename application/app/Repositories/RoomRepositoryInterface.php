<?php

namespace App\Repositories;

use App\Models\Room;

interface RoomRepositoryInterface
{
    public function all();
    public function find($id);
    public function create(array $data): Room;
    public function update(Room $room, array $data): Room;
    public function delete(Room $room): bool;
}
