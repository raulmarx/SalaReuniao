<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRequest;
use App\Http\Resources\RoomResource;
use App\Repositories\RoomRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    protected $roomRepository;

    public function __construct(RoomRepositoryInterface $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    public function index()
    {
        $rooms = $this->roomRepository->all()->where('user_id', Auth::id());
        return RoomResource::collection($rooms);
    }

    public function store(RoomRequest $request)
    {
        $data = [
            'name' => $request->name,
            'user_id' => Auth::id(),
        ];

        $room = $this->roomRepository->create($data);
        return new RoomResource($room);
    }

    public function show($id)
    {
        $room = $this->roomRepository->find($id);
        return new RoomResource($room);
    }

    public function update(RoomRequest $request, $id)
    {
        $room = $this->roomRepository->find($id);

        $this->roomRepository->update($room, $request->all());
        return new RoomResource($room);
    }

    public function destroy($id)
    {
        $room = $this->roomRepository->find($id);

        if (Auth::id() !== $room->user_id) {
            return response()->json(['error' => 'Você só pode deletar suas próprias rooms.'], 403);
        }

        $this->roomRepository->delete($room);
        return response()->json(null, 204);
    }

    public function roomsNotInUser()
    {
        $rooms = $this->roomRepository->all()->whereNotIn('user_id', [Auth::id()])
        ->load('reserves');
        return RoomResource::collection($rooms);
    }
}
