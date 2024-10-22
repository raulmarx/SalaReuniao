<?php 
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReserveResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'room_id' => $this->room_id,
            'responsible' => $this->responsible,
            'start_reservation' => $this->start_reservation,
            'end_reservation' => $this->end_reservation,
            'user_id' => $this->user_id,
            'room' => new RoomResource($this->room), 
        ];
    }
}
