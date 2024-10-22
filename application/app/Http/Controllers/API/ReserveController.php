<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReserveRequest;
use App\Http\Resources\ReserveResource;
use App\Models\Reserve;
use App\Models\Room;
use App\Repositories\ReserveRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ReserveController extends Controller
{
    protected $reserveRepository;

    public function __construct(ReserveRepositoryInterface $reserveRepository)
    {
        $this->reserveRepository = $reserveRepository;
    }

    public function index()
    {
        $reserves = $this->reserveRepository->all()->where('user_id', Auth::id())->whereNotIn('status', ['disponivel']);
        return ReserveResource::collection($reserves);
    }

    public function store(ReserveRequest $request)
    {
        $room = Room::find($request->room_id);
        if ($room->user_id === Auth::id()) {
            return response()->json(['error' => 'Você não pode reserver sua própria room.'], 403);
        }

        if ($request->start_reservation < now()) {
            return response()->json(['error' => 'A data e hora de início da reserva devem ser futuras.'], 400);
        }

        $conflito = Reserve::where('room_id', $request->room_id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_reservation', [$request->start_reservation, $request->end_reservation])
                    ->orWhereBetween('end_reservation', [$request->start_reservation, $request->end_reservation]);
            })
            ->exists();

        if ($conflito) {
            return response()->json(['error' => 'A room já está reserveda nesse horário.'], 409);
        }

        $data = [
            'room_id' => $request->room_id,
            'user_id' => Auth::id(),
            'responsible' => $request->responsible,
            'start_reservation' => $request->start_reservation,
            'end_reservation' => $request->end_reservation,
            'status' => 'reservado',
        ];

        $reserve = $this->reserveRepository->create($data);
        return new ReserveResource($reserve);
    }

    public function update(ReserveRequest $request, $id)
    {
        $reserve = $this->reserveRepository->find($id);

        if (Auth::id() !== $reserve->user_id) {
            return response()->json(['error' => 'Você só pode editar suas próprias reserves.'], 403);
        }

        $this->reserveRepository->update($reserve, $request->all());
        return new ReserveResource($reserve);
    }

    public function destroy($id)
    {
        $reserve = $this->reserveRepository->find($id);

        if ($reserve->status === 'cancelado') {
            return response()->json(['error' => 'A reserva já está cancelada.'], 400);
        }

        $this->reserveRepository->update($reserve, ['status' => 'cancelado']);

        return response()->json(['message' => 'Reserva cancelada com sucesso.'], 200);
    }
}
