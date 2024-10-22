<?php

namespace App\Repositories;

use App\Models\Reserve;

class ReserveEloquentRepository implements ReserveRepositoryInterface
{
    public function all()
    {
        return Reserve::all();
    }

    public function find($id)
    {
        return Reserve::findOrFail($id);
    }

    public function create(array $data): Reserve
    {
        return Reserve::create($data);
    }

    public function update(Reserve $reserve, array $data): Reserve
    {
        $reserve->update($data);
        return $reserve;
    }

    public function delete(Reserve $reserve): bool
    {
        return $reserve->delete();
    }
}
