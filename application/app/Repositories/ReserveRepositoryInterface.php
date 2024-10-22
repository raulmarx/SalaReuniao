<?php
namespace App\Repositories;

use App\Models\Reserve;

interface ReserveRepositoryInterface
{
    public function all();
    public function find($id);
    public function create(array $data): Reserve;
    public function update(Reserve $reserve, array $data): Reserve;
    public function delete(Reserve $reserve): bool;
}
